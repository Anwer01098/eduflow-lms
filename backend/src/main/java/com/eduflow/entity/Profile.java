package com.eduflow.entity;

import com.eduflow.enums.ProfileStatus;
import com.eduflow.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity @Table(name = "profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Profile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private UUID userId;
    private String fullName;
    @Column(nullable = false, unique = true)
    private String email;
    private String phone;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private Role role;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private ProfileStatus status;
    private String avatarUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
