package com.ai.education.platform.auth.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {  //this filter runs Once per request (Guaranteed by OncePerRequestFilter)

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        //1:Read Authorization Header
        String authHeader =  request.getHeader("Authorization");

        //if header missing or not Bearer -> skip authentication
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        //2: Extract Token (Remove "Bearer ")
        String token = authHeader.substring(7);

        try {
            //3:Validate Token (signature + expiry)
            jwtService.validateToken(token);

            //4: Extract user identity from token
            UUID userId = jwtService.extractUserId(token);
            String email = jwtService.extractEmail(token);

            //5: Build Authentication Object
            JwtUserPrincipal principal = new JwtUserPrincipal(userId, email);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            principal,
                            null,
                            Collections.emptyList() //empty because no role system
                    );

            authentication.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            //6: store authentication in SecurityContext
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (Exception ex) {  //any exceptions : Invalid token, Expired token, Malformed token -> WE Do not Authenticate the Request
           log.error("Authentication failed: {}", ex.getMessage());
            SecurityContextHolder.clearContext();
        }

        // 7️⃣ Continue filter chain
        filterChain.doFilter(request, response);
    }
}
