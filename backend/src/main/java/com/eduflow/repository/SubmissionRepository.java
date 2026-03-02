package com.eduflow.repository;

import com.eduflow.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByAssignmentId(Long assignmentId);
}
