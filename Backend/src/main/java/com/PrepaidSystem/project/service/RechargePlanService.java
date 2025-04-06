package com.PrepaidSystem.project.service;

import com.PrepaidSystem.project.exception.ResourceNotFoundException;
import com.PrepaidSystem.project.model.RechargePlan;
import com.PrepaidSystem.project.repository.CategoryRepository;
import com.PrepaidSystem.project.repository.RechargePlanRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
public class RechargePlanService {

    private final RechargePlanRepository rechargePlanRepository;
    private final CategoryRepository categoryRepository;

    public RechargePlanService(RechargePlanRepository rechargePlanRepository, CategoryRepository categoryRepository) {
        this.rechargePlanRepository = rechargePlanRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<RechargePlan> getAllRechargePlans() {
        return rechargePlanRepository.findAll();
    }

    public RechargePlan getRechargePlanById(Long id) {
        return rechargePlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recharge Plan not found with ID: " + id));
    }

    public List<RechargePlan> searchRechargePlans(Long categoryId, Double minPrice, Double maxPrice,
            Integer minValidity, Integer maxValidity, Integer minData, Integer maxData) {
        return rechargePlanRepository.searchRechargePlans(
            categoryId, minPrice, maxPrice, minValidity, maxValidity, minData, maxData
        );
    }

    public RechargePlan saveRechargePlan(RechargePlan rechargePlan) {
        if (!categoryRepository.existsById(rechargePlan.getCategory().getCategoryId())) {
            throw new ResourceNotFoundException("Category not found with ID: " + rechargePlan.getCategory().getCategoryId());
        }
        return rechargePlanRepository.save(rechargePlan);
    }

    public RechargePlan updateRechargePlan(Long id, RechargePlan rechargePlanDetails) {
        RechargePlan rechargePlan = rechargePlanRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recharge Plan not found with ID: " + id));

        rechargePlan.setName(rechargePlanDetails.getName());
        rechargePlan.setPrice(rechargePlanDetails.getPrice());
        rechargePlan.setCategory(rechargePlanDetails.getCategory());
        rechargePlan.setDescription(rechargePlanDetails.getDescription());
        rechargePlan.setValidity(rechargePlanDetails.getValidity());
        rechargePlan.setDataLimit(rechargePlanDetails.getDataLimit());
        rechargePlan.setCallMinutes(rechargePlanDetails.getCallMinutes());
        rechargePlan.setSmsCount(rechargePlanDetails.getSmsCount());

        return rechargePlanRepository.save(rechargePlan);
    }

    public List<RechargePlan> getRechargePlansByCategory(String categoryName) {
        return rechargePlanRepository.findByCategory_CategoryNameContainingIgnoreCase(categoryName);
    }

    public void deleteRechargePlan(Long id) {
        if (!rechargePlanRepository.existsById(id)) {
            throw new ResourceNotFoundException("Recharge Plan not found with ID: " + id);
        }
        rechargePlanRepository.deleteById(id);
        log.info("Deleted recharge plan with ID: {}", id);
    }
}