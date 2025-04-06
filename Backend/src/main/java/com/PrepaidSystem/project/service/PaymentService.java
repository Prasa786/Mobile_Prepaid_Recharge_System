package com.PrepaidSystem.project.service;

import com.PrepaidSystem.project.exception.ResourceNotFoundException;
import com.PrepaidSystem.project.model.Payments;
import com.PrepaidSystem.project.repository.PaymentRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payments> getAllPayments() {
        List<Payments> payments = paymentRepository.findAll();
        if (payments.isEmpty()) {
            throw new ResourceNotFoundException("No payments found");
        }
        return payments;
    }

    public List<Payments> getPaymentsByUser(Long userId) {
        List<Payments> payments = paymentRepository.findByUser_UserId(userId);
        if (payments.isEmpty()) {
            throw new ResourceNotFoundException("No payments found for user with ID: " + userId);
        }
        return payments;
    }

    public Payments getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with ID: " + id));
    }

    public Payments createPayment(@Valid Payments payment) {
        if (payment.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Payment amount must be greater than zero");
        }
        return paymentRepository.save(payment);
    }
}
