package com.ai.education.platform.auth.service;

import com.ai.education.platform.auth.dto.AuthResponse;
import com.ai.education.platform.auth.dto.LoginRequest;
import com.ai.education.platform.auth.dto.RegisterRequest;
import com.ai.education.platform.auth.security.JwtService;
import com.ai.education.platform.user.entity.User;
import com.ai.education.platform.user.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthResponse register(@Valid RegisterRequest request) {
        //check if email is already exists
        if(userRepository.existsByEmail(request.email())){
            throw new IllegalStateException("Email already Registered");
        }

        User user = User.builder()
                .email(request.email())
                .name(request.name())
                .createdAt(LocalDateTime.now())
                .password(passwordEncoder.encode(request.password()))
                .build();

        userRepository.save(user);

        String token = jwtService.generateAccessToken(user.getId(), user.getEmail());

        return new AuthResponse(token);
    }

    public AuthResponse login(@Valid LoginRequest request) {
        //user should be already in db
       User user = userRepository.findByEmail(request.email())
               .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));

       if( !passwordEncoder.matches(request.password(), user.getPassword()) ){
           throw new BadCredentialsException("Invalid email or  password");
       }

       String token = jwtService.generateAccessToken(user.getId(), user.getEmail());

        return new AuthResponse(token);
    }
}
