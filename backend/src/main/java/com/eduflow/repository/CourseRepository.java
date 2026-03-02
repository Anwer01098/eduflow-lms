package com.eduflow.repository;

import com.eduflow.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructorId(UUID instructorId);
}
