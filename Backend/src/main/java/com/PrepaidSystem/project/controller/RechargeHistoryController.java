package com.PrepaidSystem.project.controller;

import com.PrepaidSystem.project.model.Recharge_history;
import com.PrepaidSystem.project.service.RechargeHistoryService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/recharge-history")
@CrossOrigin(origins = "*")
public class RechargeHistoryController {

    @Autowired
    private RechargeHistoryService rechargeHistoryService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Recharge_history>> getAllRechargeHistories() {
        return ResponseEntity.ok(rechargeHistoryService.getAllRechargeHistories());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recharge_history>> getRechargeHistoryByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(rechargeHistoryService.getRechargeHistoryByUser(userId));
    } 
}