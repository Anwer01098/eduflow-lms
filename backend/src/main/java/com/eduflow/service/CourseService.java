package com.eduflow.service;

import com.eduflow.dto.CourseDtos.*;
import com.eduflow.entity.*;
import com.eduflow.enums.CourseStatus;
import com.eduflow.exception.ApiException;
import com.eduflow.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final ProfileRepository profileRepository;

    public CourseService(CourseRepository courseRepository, EnrollmentRepository enrollmentRepository,
                         ProfileRepository profileRepository) {
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.profileRepository = profileRepository;
    }

    public Course create(UUID userId, CourseRequest req) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Profile not found"));
        return courseRepository.save(Course.builder()
                .title(req.title()).description(req.description())
                .category(req.category()).level(req.level())
                .imageUrl(req.imageUrl()).instructorId(userId)
                .instructorName(profile.getFullName())
                .modulesCount(req.modulesCount() != null ? req.modulesCount() : 0)
                .studentsCount(0)
                .status(req.status() != null ? req.status() : CourseStatus.DRAFT)
                .createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build());
    }

    public List<Course> all() {
        return courseRepository.findAll();
    }

    public List<Course> byInstructor(UUID instructorId) {
        return courseRepository.findByInstructorId(instructorId);
    }

    public Course findById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Course not found"));
    }

    public Enrollment enroll(Long courseId, UUID studentId) {
        if (enrollmentRepository.findByCourseIdAndStudentId(courseId, studentId).isPresent())
            throw new ApiException(HttpStatus.CONFLICT, "Already enrolled");
        Course course = findById(courseId);
        course.setStudentsCount((course.getStudentsCount() != null ? course.getStudentsCount() : 0) + 1);
        courseRepository.save(course);
        return enrollmentRepository.save(Enrollment.builder()
                .courseId(courseId).studentId(studentId)
                .progress(0).enrolledAt(LocalDateTime.now()).build());
    }

    public List<Enrollment> enrollments(UUID studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    public void unenroll(Long courseId, UUID studentId) {
        Enrollment e = enrollmentRepository.findByCourseIdAndStudentId(courseId, studentId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Enrollment not found"));
        enrollmentRepository.delete(e);
    }
}
