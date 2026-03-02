package com.eduflow.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity @Table(name = "course_files")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CourseFile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String contextType;
    private Long contextId;
    private String fileName;
    private String fileType;
    private String fileUrl;
    private Long fileSize;
    private UUID uploadedBy;
    private LocalDateTime createdAt;
}
