package com.eduflow.repository;

import com.eduflow.entity.BlockedEmail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockedEmailRepository extends JpaRepository<BlockedEmail, Long> {
}
