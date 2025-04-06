package com.PrepaidSystem.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.PrepaidSystem.project.model.RechargePlan;

import java.util.List;

@Repository
public interface RechargePlanRepository extends JpaRepository<RechargePlan, Long> {

    List<RechargePlan> findByCategory_CategoryId(Long categoryId);

    List<RechargePlan> findByNameContainingIgnoreCase(String name);

    List<RechargePlan> findByPriceBetween(double minPrice, double maxPrice);

    List<RechargePlan> findByValidity(String validity);

    List<RechargePlan> findByDataLimit(String dataLimit);

    List<RechargePlan> findByPrice(Double price);
    
    List<RechargePlan> findByCategory_CategoryNameContainingIgnoreCase(String categoryName);


    @Query("SELECT r FROM RechargePlan r WHERE " +
           "(:categoryId IS NULL OR r.category.categoryId = :categoryId) " +
           "AND (:minPrice IS NULL OR r.price >= :minPrice) " +
           "AND (:maxPrice IS NULL OR r.price <= :maxPrice) " +
           "AND (:minValidity IS NULL OR r.validity >= :minValidity) " +
           "AND (:maxValidity IS NULL OR r.validity <= :maxValidity) " +
           "AND (:minData IS NULL OR r.dataLimit >= :minData) " +
           "AND (:maxData IS NULL OR r.dataLimit <= :maxData)")
    List<RechargePlan> searchRechargePlans(
           @Param("categoryId") Long categoryId,
           @Param("minPrice") Double minPrice,
           @Param("maxPrice") Double maxPrice,
           @Param("minValidity") Integer minValidity,
           @Param("maxValidity") Integer maxValidity,
           @Param("minData") Integer minData,
           @Param("maxData") Integer maxData
    );
}
