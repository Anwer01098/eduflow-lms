package com.eduflow.entity;

import com.eduflow.enums.ConversationType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity @Table(name = "conversations")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Conversation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private ConversationType type;
    private String title;
    private Long courseId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
