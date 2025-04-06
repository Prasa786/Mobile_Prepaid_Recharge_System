package com.PrepaidSystem.project.service;

import com.PrepaidSystem.project.exception.ResourceNotFoundException;
import com.PrepaidSystem.project.model.RoleType;
import com.PrepaidSystem.project.model.Statuses;
import com.PrepaidSystem.project.model.Users;
import com.PrepaidSystem.project.repository.RoleRepository;
import com.PrepaidSystem.project.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final Map<String, String> otpStorage = new HashMap<>();

    private final OtpService otpService; 
    
    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElse(null);
    }

    public String generateOtp(String mobile) {
        if (userRepository.findByMobile(mobile).isEmpty()) {
            throw new ResourceNotFoundException("User with this mobile does not exist");
        }
        return otpService.generateAndStoreOtp(mobile);
    }

    public boolean verifyOtp(String mobile, String otp) {
        return otpService.validateOtp(mobile, otp);
    }

    public Users registerUser(Users user) {
        try {
            if (user.getMobile() == null || user.getMobile().isEmpty()) {
                throw new IllegalArgumentException("Mobile number cannot be null or empty");
            }
            if (userRepository.findByMobile(user.getMobile()).isPresent()) {
                throw new IllegalArgumentException("Mobile number already registered");
            }
            if (user.getRole() == null || user.getRole().getRoleType() == null) {
                user.setRole(roleRepository.findByRoleType(RoleType.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Default role USER not found")));
            }
            else {
                user.setRole(roleRepository.findByRoleType(user.getRole().getRoleType())
                    .orElseThrow(() -> new RuntimeException("Role not found: " + user.getRole().getRoleType())));
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setCreatedAt(LocalDateTime.now());
            user.setStatus(Statuses.ACTIVE);
            return userRepository.save(user);

        } catch (Exception e) {
            throw new RuntimeException("Registration failed. Reason: " + e.getMessage());
        }
    }
    public Users registerAdmin(Users admin) {
        if (admin.getEmail() == null || admin.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setCreatedAt(LocalDateTime.now()); 
        admin.setStatus(Statuses.ACTIVE);
        admin.setRole(roleRepository.findByRoleType(RoleType.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("Default role ADMIN not found")));
        return userRepository.save(admin);
    }

    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<Users> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Users updateUser(Long id, Users updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            user.setRole(updatedUser.getRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    public List<Users> getUsersByStatus(String status) {
        List<Users> users = userRepository.findByStatus(status);
        if (users.isEmpty()) {
            throw new ResourceNotFoundException("No users found with status: " + status);
        }
        return users;
    }

    public Users saveUser(Users user) {
        if (user.getMobile() == null || user.getMobile().isEmpty()) {
            throw new IllegalArgumentException("Mobile number cannot be null or empty");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null || user.getRole().getRoleType() == null) {
            user.setRole(roleRepository.findByRoleType(RoleType.ROLE_USER)
                .orElseThrow(() -> new RuntimeException("Default role USER not found")));
        } else {
            user.setRole(roleRepository.findByRoleType(user.getRole().getRoleType())
                .orElseGet(() -> roleRepository.save(user.getRole())));
        }
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    public Optional<Users> getUserByMobile(String mobile) {
        return userRepository.findByMobile(mobile);
    }

    public boolean userExists(String mobile, String email) {
        return userRepository.findByMobile(mobile).isPresent() || userRepository.findByEmail(email).isPresent();
    }

    public boolean userExistsByMobile(String formattedPhone) {
        return userRepository.findByMobile(formattedPhone).isPresent();
    }
}
