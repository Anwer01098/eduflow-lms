package com.eduflow.repository;

import com.eduflow.entity.Profile;
import com.eduflow.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(UUID userId);
    Optional<Profile> findByEmail(String email);
    List<Profile> findByRole(Role role);
}
