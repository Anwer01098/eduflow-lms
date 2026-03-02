package com.eduflow.controller;

import com.eduflow.dto.CourseDtos.*;
import com.eduflow.entity.Course;
import com.eduflow.entity.Enrollment;
import com.eduflow.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping
    public Course create(@AuthenticationPrincipal UUID userId, @Valid @RequestBody CourseRequest req) {
        return service.create(userId, req);
    }

    @GetMapping
    public List<Course> all() {
        return service.all();
    }

    @GetMapping("/{id}")
    public Course byId(@PathVariable Long id) {
        return service.findById(id);
    }

    @GetMapping("/instructor")
    public List<Course> byInstructor(@AuthenticationPrincipal UUID userId) {
        return service.byInstructor(userId);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/{courseId}/enroll")
    public Enrollment enroll(@PathVariable Long courseId, @AuthenticationPrincipal UUID userId) {
        return service.enroll(courseId, userId);
    }

    @GetMapping("/enrollments")
    public List<Enrollment> enrollments(@AuthenticationPrincipal UUID userId) {
        return service.enrollments(userId);
    }

    @PreAuthorize("hasRole('STUDENT')")
    @DeleteMapping("/{courseId}/unenroll")
    public void unenroll(@PathVariable Long courseId, @AuthenticationPrincipal UUID userId) {
        service.unenroll(courseId, userId);
    }
}
