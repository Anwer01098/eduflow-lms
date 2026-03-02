package com.eduflow.controller;

import com.eduflow.dto.AssignmentDtos.*;
import com.eduflow.entity.Assignment;
import com.eduflow.entity.Submission;
import com.eduflow.service.AssignmentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    private final AssignmentService service;

    public AssignmentController(AssignmentService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping
    public Assignment create(@AuthenticationPrincipal UUID userId, @RequestBody AssignmentRequest req) {
        return service.create(userId, req);
    }

    @GetMapping("/course/{courseId}")
    public List<Assignment> byCourse(@PathVariable Long courseId) {
        return service.byCourse(courseId);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/submit")
    public Submission submit(@AuthenticationPrincipal UUID userId, @RequestBody SubmissionRequest req) {
        return service.submit(userId, req);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PatchMapping("/submissions/{submissionId}/grade")
    public Submission grade(@AuthenticationPrincipal UUID userId, @PathVariable Long submissionId, @RequestBody GradeRequest req) {
        return service.grade(userId, submissionId, req);
    }
}
