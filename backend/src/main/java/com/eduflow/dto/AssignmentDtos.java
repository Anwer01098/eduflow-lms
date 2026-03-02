package com.eduflow.dto;

import java.time.LocalDateTime;

public class AssignmentDtos {
    public record AssignmentRequest(Long courseId, String title, String description, Integer maxGrade, LocalDateTime dueDate) {}
    public record SubmissionRequest(Long assignmentId, String fileName, String contentNote) {}
    public record GradeRequest(Integer grade, String feedback) {}
}
