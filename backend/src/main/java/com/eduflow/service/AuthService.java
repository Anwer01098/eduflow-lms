package com.eduflow.service;

import com.eduflow.dto.AuthDtos.*;
import com.eduflow.entity.*;
import com.eduflow.enums.*;
import com.eduflow.exception.ApiException;
import com.eduflow.repository.*;
import com.eduflow.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthService {
    private final UserAccountRepository userRepo;
    private final ProfileRepository profileRepo;
    private final TeacherApprovalRequestRepository approvalRepo;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserAccountRepository userRepo, ProfileRepository profileRepo,
                       TeacherApprovalRequestRepository approvalRepo, RefreshTokenRepository refreshTokenRepository,
                       PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepo = userRepo;
        this.profileRepo = profileRepo;
        this.approvalRepo = approvalRepo;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest req) {
        if (userRepo.findByEmail(req.email()).isPresent())
            throw new ApiException(HttpStatus.CONFLICT, "Email already exists");
        Role role = req.role() == null ? Role.STUDENT : req.role();
        ProfileStatus status = role == Role.TEACHER ? ProfileStatus.PENDING : ProfileStatus.ACTIVE;
        UUID userId = UUID.randomUUID();
        userRepo.save(UserAccount.builder()
                .id(userId).email(req.email())
                .passwordHash(passwordEncoder.encode(req.password()))
                .role(role).createdAt(LocalDateTime.now()).build());
        Profile profile = profileRepo.save(Profile.builder()
                .userId(userId).email(req.email()).fullName(req.fullName())
                .role(role).status(status)
                .createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build());
        if (role == Role.TEACHER) {
            approvalRepo.save(TeacherApprovalRequest.builder()
                    .profileId(profile.getId()).email(profile.getEmail())
                    .fullName(profile.getFullName()).phone(profile.getPhone())
                    .status(ApprovalStatus.PENDING).createdAt(LocalDateTime.now()).build());
        }
        return issueTokens(userId, role, status);
    }

    public AuthResponse login(LoginRequest req) {
        UserAccount user = userRepo.findByEmail(req.email())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        if (!passwordEncoder.matches(req.password(), user.getPasswordHash()))
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        Profile profile = profileRepo.findByUserId(user.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Profile not found"));
        return issueTokens(user.getId(), user.getRole(), profile.getStatus());
    }

    public AuthResponse refresh(RefreshRequest req) {
        RefreshToken token = refreshTokenRepository.findByToken(req.refreshToken())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid refresh token"));
        if (token.isRevoked() || token.getExpiresAt().isBefore(LocalDateTime.now()))
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Refresh token expired");
        UserAccount user = userRepo.findById(token.getUserId()).orElseThrow();
        Profile profile = profileRepo.findByUserId(user.getId()).orElseThrow();
        return issueTokens(user.getId(), user.getRole(), profile.getStatus());
    }

    public void logout(String refreshToken) {
        refreshTokenRepository.findByToken(refreshToken).ifPresent(t -> {
            t.setRevoked(true);
            refreshTokenRepository.save(t);
        });
    }

    private AuthResponse issueTokens(UUID userId, Role role, ProfileStatus status) {
        String access = jwtService.generateAccessToken(userId, role.name());
        String refresh = jwtService.generateRefreshToken(userId, role.name());
        refreshTokenRepository.save(RefreshToken.builder()
                .token(refresh).userId(userId)
                .expiresAt(LocalDateTime.now().plusDays(7)).revoked(false).build());
        return new AuthResponse(access, refresh, role.name(), status.name());
    }
}
