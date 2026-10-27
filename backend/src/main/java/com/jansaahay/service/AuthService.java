package com.jansaahay.service;

import com.jansaahay.config.JwtTokenProvider;
import com.jansaahay.dto.*;
import com.jansaahay.entity.User;
import com.jansaahay.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail().toLowerCase().trim())) {
            throw new IllegalArgumentException("An account with this email already exists.");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().toLowerCase().trim());
        // Hash password securely with BCrypt - never stored or logged in plain text
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");
        user.setBlocked(false);
        user.setCreatedAt(LocalDateTime.now());
        user.setLastLoginAt(LocalDateTime.now());

        User saved = userRepository.save(user);

        String accessToken = tokenProvider.generateAccessToken(
                saved.getId(), saved.getEmail(), saved.getName(), saved.getRole());
        String refreshToken = tokenProvider.generateRefreshToken(saved.getEmail());

        return new AuthResponse(accessToken, refreshToken, toUserDto(saved));
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        String email = request.getEmail().toLowerCase().trim();
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        User user = userOpt.get();

        if (user.isBlocked()) {
            throw new IllegalStateException("Your account has been suspended by the administrator. Contact support.");
        }

        // Verify BCrypt hash match
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        String accessToken = tokenProvider.generateAccessToken(
                user.getId(), user.getEmail(), user.getName(), user.getRole());
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());

        return new AuthResponse(accessToken, refreshToken, toUserDto(user));
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        if (!tokenProvider.validateToken(request.getRefreshToken())) {
            throw new IllegalArgumentException("Invalid or expired refresh token. Please log in again.");
        }

        String email = tokenProvider.getEmailFromToken(request.getRefreshToken());
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User no longer exists."));

        if (user.isBlocked()) {
            throw new IllegalStateException("Account is blocked.");
        }

        String newAccessToken = tokenProvider.generateAccessToken(
                user.getId(), user.getEmail(), user.getName(), user.getRole());

        return new AuthResponse(newAccessToken, request.getRefreshToken(), toUserDto(user));
    }

    public UserDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));
        return toUserDto(user);
    }

    public UserDto toUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isBlocked(),
                user.getCreatedAt(),
                user.getLastLoginAt()
        );
    }
}
