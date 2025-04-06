package com.PrepaidSystem.project.model;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.math.BigDecimal;

@Entity
@Table(name = "recharge_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RechargePlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;
    private String name;
    private BigDecimal price;
    private String validity;
    private String dataLimit;
    private String benefits;
    private String planType;
    private String description;
    private int smsCount;
    private int callMinutes;
    private long validityDays;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @JsonBackReference
    private Category category;
}