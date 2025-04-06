package com.PrepaidSystem.project.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    private final Map<String, OtpDetails> otpStorage = new HashMap<>();
    private static final int OTP_EXPIRY_MINUTES = 5;

    public String generateAndStoreOtp(String mobile) {
        String otp = generateOtp();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES);
        otpStorage.put(mobile, new OtpDetails(otp, expiryTime));
        return otp;
    }

    public boolean validateOtp(String mobile, String userOtp) {
        if (!otpStorage.containsKey(mobile)) {
            return false;
        }

        OtpDetails otpDetails = otpStorage.get(mobile);
        if (otpDetails.getExpiryTime().isBefore(LocalDateTime.now())) {
            otpStorage.remove(mobile);
            return false;
        }

        boolean isValid = otpDetails.getOtp().equals(userOtp);
        if (isValid) {
            otpStorage.remove(mobile);
        }
        return isValid;
    }

    public void clearOtp(String mobile) {
        otpStorage.remove(mobile);
    }

    private String generateOtp() {
        return String.valueOf(new Random().nextInt(900000) + 100000);
    }

    public String formatPhoneNumber(String phoneNumber) {
        if (phoneNumber.startsWith("+")) {
            return phoneNumber;
        }
        return "+91" + phoneNumber;
    }

    private static class OtpDetails {
        private final String otp;
        private final LocalDateTime expiryTime;

        public OtpDetails(String otp, LocalDateTime expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }

        public String getOtp() {
            return otp;
        }

        public LocalDateTime getExpiryTime() {
            return expiryTime;
        }
    }
}
