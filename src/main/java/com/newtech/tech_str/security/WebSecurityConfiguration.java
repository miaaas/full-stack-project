package com.newtech.tech_str.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.http.HttpMethod;


@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {

  private final JwtAuthConverter jwtAuthConverter;
   
    @SuppressWarnings("removal")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http.cors().and().csrf().disable();

      http.authorizeHttpRequests()
        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
        .requestMatchers("weather/download-files").permitAll()
        .requestMatchers(HttpMethod.POST, "/products/*", "/producers/*", "/locations/*" ).hasRole("myadmin")
        .requestMatchers(HttpMethod.PUT, "/products/*", "/producers/*", "/locations/*").hasRole("myadmin")
        .requestMatchers(HttpMethod.DELETE, "/products/*", "/producers/*", "/locations/*").hasRole("myadmin")
        .requestMatchers(HttpMethod.GET, "/products/*", "/producers/*", "/locations/*", "/testEmail/*", "/triggercrawler/*").permitAll()
        .anyRequest().permitAll();

      http.oauth2ResourceServer()
          .jwt()
          .jwtAuthenticationConverter(jwtAuthConverter);

      http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); 
      return http.build();
  }
}
