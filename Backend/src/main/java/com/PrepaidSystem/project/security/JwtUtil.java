package com.PrepaidSystem.project.security;

import com.PrepaidSystem.project.model.RevokedToken;
import com.PrepaidSystem.project.repository.RevokedTokenRepository;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;
import java.util.function.Function;
import java.util.logging.Logger;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private long expirationTime;
    private final RevokedTokenRepository revokedTokenRepository;
    private static final Logger logger = Logger.getLogger(JwtUtil.class.getName());

    public JwtUtil(RevokedTokenRepository revokedTokenRepository) {
        this.revokedTokenRepository = revokedTokenRepository;
    }
    private Key getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public void revokeToken(String token) {
        revokedTokenRepository.save(new RevokedToken(token));
        logger.info("Token revoked: " + token);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        return claimsResolver.apply(Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody());
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            Optional<RevokedToken> revokedToken = revokedTokenRepository.findByToken(token);
            boolean isValid = username.equals(userDetails.getUsername()) && !isTokenExpired(token) && revokedToken.isEmpty();
            if (!isValid) {
                logger.warning("Invalid token: " + token);
            }
            return isValid;
        } catch (JwtException e) {
            logger.severe("JWT validation failed: " + e.getMessage());
            return false;
        }
    }

    public long getExpirationTime() {
        return expirationTime;
    }
}
