package com.eduflow.entity;

import com.eduflow.enums.SubmissionStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity @Table(name = "submissions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Submission {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long assignmentId;
    private UUID studentId;
    @Enumerated(EnumType.STRING)
    private SubmissionStatus status;
    private Integer grade;
    @Column(columnDefinition = "TEXT")
    private String feedback;
    private String fileName;
    private LocalDateTime submittedAt;
    private LocalDateTime gradedAt;
}
