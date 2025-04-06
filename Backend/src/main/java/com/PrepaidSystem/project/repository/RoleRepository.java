package com.PrepaidSystem.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PrepaidSystem.project.model.Role;
import com.PrepaidSystem.project.model.RoleType;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
	    Optional<Role> findByRoleType(RoleType roleType);	
}
