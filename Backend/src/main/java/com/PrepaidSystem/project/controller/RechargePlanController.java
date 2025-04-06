package com.PrepaidSystem.project.controller;

import com.PrepaidSystem.project.model.RechargePlan;
import com.PrepaidSystem.project.service.RechargePlanService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/recharge-plans")
@CrossOrigin(origins = "*")
public class RechargePlanController {

    private final RechargePlanService rechargePlanService;

    public RechargePlanController(RechargePlanService rechargePlanService) {
        this.rechargePlanService = rechargePlanService;
    }

    @GetMapping
    public ResponseEntity<List<RechargePlan>> getAllRechargePlans() {
        return ResponseEntity.ok(rechargePlanService.getAllRechargePlans());
    }

    
    @GetMapping("/search")
    public ResponseEntity<List<RechargePlan>> searchRechargePlans(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer minValidity,
            @RequestParam(required = false) Integer maxValidity,
            @RequestParam(required = false) Integer minData,
            @RequestParam(required = false) Integer maxData) {
        List<RechargePlan> plans = rechargePlanService.searchRechargePlans(
            categoryId, minPrice, maxPrice, minValidity, maxValidity, minData, maxData
        );
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RechargePlan> getRechargePlanById(@PathVariable Long id) {
        return ResponseEntity.ok(rechargePlanService.getRechargePlanById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<RechargePlan> createRechargePlan(@Valid @RequestBody RechargePlan rechargePlan) {
        return new ResponseEntity<>(rechargePlanService.saveRechargePlan(rechargePlan), HttpStatus.CREATED);
    }

    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<RechargePlan> updateRechargePlan(@PathVariable Long id, @Valid @RequestBody RechargePlan rechargePlanDetails) {
        return ResponseEntity.ok(rechargePlanService.updateRechargePlan(id, rechargePlanDetails));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRechargePlan(@PathVariable Long id) {
        rechargePlanService.deleteRechargePlan(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<RechargePlan>> getRechargePlansByCategory(@PathVariable String categoryName) {
        List<RechargePlan> plans = rechargePlanService.getRechargePlansByCategory(categoryName);
        return ResponseEntity.ok(plans);
    }
}