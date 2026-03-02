package com.eduflow.dto;

import com.eduflow.enums.CourseStatus;
import jakarta.validation.constraints.NotBlank;

public class CourseDtos {
    public record CourseRequest(@NotBlank String title, String description, String category, String level, String imageUrl, Integer modulesCount, CourseStatus status) {}
}
