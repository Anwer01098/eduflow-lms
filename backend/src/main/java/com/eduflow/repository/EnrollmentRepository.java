package com.eduflow.repository;

import com.eduflow.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import java.util.UUID;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentId(UUID studentId);
    Optional<Enrollment> findByCourseIdAndStudentId(Long courseId, UUID studentId);
}
