package com.eduflow.repository;

import com.eduflow.entity.TeacherApprovalRequest;
import com.eduflow.enums.ApprovalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TeacherApprovalRequestRepository extends JpaRepository<TeacherApprovalRequest, Long> {
    List<TeacherApprovalRequest> findByStatus(ApprovalStatus status);
}
