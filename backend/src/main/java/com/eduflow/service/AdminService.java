package com.eduflow.service;

import com.eduflow.entity.*;
import com.eduflow.enums.*;
import com.eduflow.exception.ApiException;
import com.eduflow.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AdminService {
    private final TeacherApprovalRequestRepository approvalRepo;
    private final ProfileRepository profileRepo;
    private final BlockedEmailRepository blockedEmailRepository;

    public AdminService(TeacherApprovalRequestRepository approvalRepo, ProfileRepository profileRepo,
                        BlockedEmailRepository blockedEmailRepository) {
        this.approvalRepo = approvalRepo;
        this.profileRepo = profileRepo;
        this.blockedEmailRepository = blockedEmailRepository;
    }

    public List<TeacherApprovalRequest> pendingApprovals() {
        return approvalRepo.findByStatus(ApprovalStatus.PENDING);
    }

    public TeacherApprovalRequest review(Long id, boolean approve, UUID adminUserId) {
        TeacherApprovalRequest request = approvalRepo.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Approval request not found"));
        Profile profile = profileRepo.findById(request.getProfileId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Profile not found"));
        request.setStatus(approve ? ApprovalStatus.APPROVED : ApprovalStatus.DENIED);
        request.setReviewedAt(LocalDateTime.now());
        request.setReviewedBy(adminUserId);
        profile.setStatus(approve ? ProfileStatus.ACTIVE : ProfileStatus.DENIED);
        profile.setUpdatedAt(LocalDateTime.now());
        profileRepo.save(profile);
        return approvalRepo.save(request);
    }

    public Profile blockTeacher(Long profileId, String reason) {
        Profile p = profileRepo.findById(profileId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Profile not found"));
        p.setStatus(ProfileStatus.BLOCKED);
        profileRepo.save(p);
        blockedEmailRepository.save(BlockedEmail.builder()
                .email(p.getEmail()).blockedAt(LocalDateTime.now()).reason(reason).build());
        return p;
    }
}
