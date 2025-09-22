package com.nic.OdishaOne.config;

import com.nic.OdishaOne.Service.JwtService;
import com.nic.OdishaOne.Service.OdishaOneUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService;

    @Autowired
    ApplicationContext context;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // String authHeader = request.getHeader("Authorization");
        // String token = null;
        // String userName = null;
        //
        // if(authHeader != null && authHeader.startsWith("Bearer ")){
        // token = authHeader.substring(7);
        // userName = jwtService.extractUserName(token);
        // }

        // Extract JWT from Cookie instead of Authorization Header
        try {
            String token = null;
            String userName = null;

            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if ("jwt".equals(cookie.getName())) { // Look for the JWT cookie
                        token = cookie.getValue();
                        break;
                    }
                }
            }

            if (token != null) {
                userName = jwtService.extractUserName(token);
            }

            if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails = context.getBean(OdishaOneUserDetailService.class)
                        .loadUserByUsername(userName);
                if (jwtService.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                            null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            filterChain.doFilter(request, response);
        } catch (io.jsonwebtoken.security.SignatureException e) {
            System.out.println("Signature exception" + e.getMessage());
            filterChain.doFilter(request, response);
        }
    }
}
