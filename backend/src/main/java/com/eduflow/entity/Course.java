package com.eduflow.entity;

import com.eduflow.enums.CourseStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity @Table(name = "courses")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String category;
    private String level;
    private String imageUrl;
    @Column(nullable = false)
    private UUID instructorId;
    private String instructorName;
    private Integer modulesCount;
    private Integer studentsCount;
    @Enumerated(EnumType.STRING)
    private CourseStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
