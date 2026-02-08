package com.ai.education.platform.auth.security;

import java.util.UUID;

//Represents the Authenticated user , stored inside Security Context
public record JwtUserPrincipal(
        UUID userId,
        String email
) {

}
