package com.ai.education.platform.auth.security;


import com.ai.education.platform.user.entity.User;
import com.ai.education.platform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService { //Loads user data from database for authentication, Used internally by Spring Security Bridges User entity with Spring Security framework

   private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        //SpringSecurity expects a UserDetails object, We map our User entity to Spring's UserDetails
        return org.springframework.security.core.userdetails.User   //this User class is Java's UserDetails class to separate that this long written
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities(Collections.emptyList())
                .build();
    }
}
