package com.PrepaidSystem.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.PrepaidSystem.project.model.Users;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
	 Optional<Users> findByUsername(String username); 
    List<Users> findByStatus(String status); 
    List<Users> findByRole_RoleId(Long roleId);
    List<Users> findByUsernameContainingIgnoreCase(String username);
    Optional<Users> findByMobile(String mobile);
    Optional<Users> findByEmail(String email);

}
