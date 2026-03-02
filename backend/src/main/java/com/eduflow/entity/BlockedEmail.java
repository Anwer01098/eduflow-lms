package com.eduflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "blocked_emails")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BlockedEmail {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private LocalDateTime blockedAt;
    private String reason;
}
