package com.eduflow.dto;

import com.eduflow.enums.Role;
import jakarta.validation.constraints.*;

public class AuthDtos {
    public record RegisterRequest(@Email String email, @Size(min = 8) String password, @NotBlank String fullName, Role role) {}
    public record LoginRequest(@Email String email, @NotBlank String password) {}
    public record RefreshRequest(@NotBlank String refreshToken) {}
    public record AuthResponse(String accessToken, String refreshToken, String role, String status) {}
}
