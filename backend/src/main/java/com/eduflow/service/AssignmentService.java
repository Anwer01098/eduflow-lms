package com.eduflow.service;

import com.eduflow.dto.AssignmentDtos.*;
import com.eduflow.entity.*;
import com.eduflow.enums.SubmissionStatus;
import com.eduflow.exception.ApiException;
import com.eduflow.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final SubmissionRepository submissionRepository;

    public AssignmentService(AssignmentRepository assignmentRepository, SubmissionRepository submissionRepository) {
        this.assignmentRepository = assignmentRepository;
        this.submissionRepository = submissionRepository;
    }

    public Assignment create(UUID userId, AssignmentRequest req) {
        return assignmentRepository.save(Assignment.builder()
                .courseId(req.courseId()).title(req.title())
                .description(req.description()).maxGrade(req.maxGrade())
                .dueDate(req.dueDate()).createdBy(userId)
                .createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build());
    }

    public List<Assignment> byCourse(Long courseId) {
        return assignmentRepository.findByCourseId(courseId);
    }

    public Submission submit(UUID userId, SubmissionRequest req) {
        return submissionRepository.save(Submission.builder()
                .assignmentId(req.assignmentId()).studentId(userId)
                .status(SubmissionStatus.SUBMITTED).fileName(req.fileName())
                .submittedAt(LocalDateTime.now()).build());
    }

    public Submission grade(UUID userId, Long submissionId, GradeRequest req) {
        Submission s = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Submission not found"));
        s.setGrade(req.grade());
        s.setFeedback(req.feedback());
        s.setStatus(SubmissionStatus.GRADED);
        s.setGradedAt(LocalDateTime.now());
        return submissionRepository.save(s);
    }
}
