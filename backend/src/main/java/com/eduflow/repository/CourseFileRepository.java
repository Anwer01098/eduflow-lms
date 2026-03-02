package com.eduflow.repository;

import com.eduflow.entity.CourseFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseFileRepository extends JpaRepository<CourseFile, Long> {
}
