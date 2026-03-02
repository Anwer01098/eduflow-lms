package com.eduflow.controller;

import com.eduflow.entity.Profile;
import com.eduflow.entity.TeacherApprovalRequest;
import com.eduflow.repository.CourseRepository;
import com.eduflow.repository.ProfileRepository;
import com.eduflow.service.AdminService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final AdminService adminService;
    private final ProfileRepository profileRepository;
    private final CourseRepository courseRepository;

    public AdminController(AdminService adminService, ProfileRepository profileRepository,
                           CourseRepository courseRepository) {
        this.adminService = adminService;
        this.profileRepository = profileRepository;
        this.courseRepository = courseRepository;
    }

    @GetMapping("/approvals")
    public List<TeacherApprovalRequest> approvals() {
        return adminService.pendingApprovals();
    }

    @PatchMapping("/approvals/{id}")
    public TeacherApprovalRequest review(@PathVariable Long id, @RequestParam boolean approve,
                                          @AuthenticationPrincipal UUID userId) {
        return adminService.review(id, approve, userId);
    }

    @PatchMapping("/teachers/{profileId}/block")
    public Profile blockTeacher(@PathVariable Long profileId, @RequestBody Map<String, String> body) {
        return adminService.blockTeacher(profileId, body.getOrDefault("reason", "Policy violation"));
    }

    @GetMapping("/users")
    public List<Profile> users() {
        return profileRepository.findAll();
    }

    @GetMapping("/courses")
    public Object courses() {
        return courseRepository.findAll();
    }
}
