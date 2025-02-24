package com.newtech.tech_str.security;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {


  private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter;

  public JwtAuthConverter() {
      this.jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
  }

    @SuppressWarnings("null")
    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
            final Set<GrantedAuthority> authorities = Stream.concat( 
            jwtGrantedAuthoritiesConverter.convert(jwt).stream(), 
            extractUserRoles(jwt).stream()
        ).collect(Collectors.toSet()); 
        return new JwtAuthenticationToken(jwt, authorities); 
    }

    @SuppressWarnings("unchecked")
    private Set<? extends GrantedAuthority> extractUserRoles(Jwt jwt) {
        final Map<String, Object> resourceAccess = jwt.getClaim("resource_access"); 
        final Map<String, Object> clientRoles = (Map<String, Object>) resourceAccess.get("myclient");
        final List<String> roles = (List<String>) clientRoles.get("roles");

        if (CollectionUtils.isNotEmpty(roles)) {
            return roles.stream()
                    .map(role -> new SimpleGrantedAuthority(role))
                    .collect(Collectors.toSet());
        }

        return Collections.emptySet();
    }

}
