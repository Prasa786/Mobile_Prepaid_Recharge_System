package com.PrepaidSystem.project.service;

import com.PrepaidSystem.project.exception.ResourceNotFoundException;
import com.PrepaidSystem.project.model.Role;
import com.PrepaidSystem.project.model.RoleType;
import com.PrepaidSystem.project.repository.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleByName(RoleType roleType) {
        return roleRepository.findByRoleType(roleType)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleType));
    }

    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Role not found with ID: " + id);
        }
        roleRepository.deleteById(id);
    }
}
