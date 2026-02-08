package com.ai.education.platform.auth.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.sql.Date;
import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JwtService {  //for Generate JWT token , JWT Validate (signature + expiry), extract userId, email)

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}") //token Validity Duration
    private Long jwtExpiration;

    //convert SecretKey to CryptoGraphic key (converting normal String to Secret Key)
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(secretKey));
    }

    //Generate JWT Access Token
    public String generateAccessToken(UUID userId, String email) {
        Instant now = Instant.now();

        return Jwts.builder()
                .subject(email)
                .claim("userId", userId.toString())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusMillis(jwtExpiration)))  //current time + expiry time
                .signWith(getSigningKey())
                .compact();
    }

    //Validate Jwt Token (signature + expiry)
    public void validateToken(String token) {               //If token is invalid/expired → JJWT throws exception automatically→ We handle it in filter

        Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token);
    }

    // ---  we can create a separate Record class(jwtUserPrincipal ) to save all principal (extracted (userId, email) from jwt )
    //extract Claims
    public Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload(); //will get All the Claims
    }

    //Extract UserId
    public UUID extractUserId(String token) {

        Claims claims = extractAllClaims(token);
        return UUID.fromString(claims.get("userId", String.class));
    }

    //Extract email(subject)
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

}
