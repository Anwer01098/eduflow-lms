package com.eduflow.entity;

import com.eduflow.enums.ApprovalStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity @Table(name = "teacher_approval_requests")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TeacherApprovalRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long profileId;
    private String fullName;
    private String email;
    private String phone;
    @Enumerated(EnumType.STRING)
    private ApprovalStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime reviewedAt;
    private UUID reviewedBy;
}
