package com.jansaahay.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS_PER_MINUTE = 10;
    private final ConcurrentHashMap<String, RateLimitCounter> ipRequestCounts = new ConcurrentHashMap<>();

    private static class RateLimitCounter {
        private final AtomicInteger count = new AtomicInteger(0);
        private volatile long resetTimeMs = System.currentTimeMillis() + 60_000L;

        public boolean tryAcquire() {
            long now = System.currentTimeMillis();
            if (now > resetTimeMs) {
                count.set(0);
                resetTimeMs = now + 60_000L;
            }
            return count.incrementAndGet() <= MAX_REQUESTS_PER_MINUTE;
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Apply rate limiting specifically on sensitive auth endpoints
        String path = request.getRequestURI();
        if (path.endsWith("/api/auth/login") || path.endsWith("/api/auth/register")) {
            String clientIp = getClientIp(request);
            RateLimitCounter counter = ipRequestCounts.computeIfAbsent(clientIp, k -> new RateLimitCounter());

            if (!counter.tryAcquire()) {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.getWriter().write("{\"error\": \"Too many login attempts. Please wait 1 minute before trying again.\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xf = request.getHeader("X-Forwarded-For");
        if (xf != null && !xf.isBlank()) {
            return xf.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
