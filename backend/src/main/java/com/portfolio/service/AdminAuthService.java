package com.portfolio.service;

import com.portfolio.dto.AdminLoginRequest;
import com.portfolio.dto.AdminLoginResponse;
import com.portfolio.entity.Admin;
import com.portfolio.repository.AdminRepository;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AdminAuthService {
    private final AdminRepository adminRepository;
    private final Map<String, String> activeTokens = new ConcurrentHashMap<>();

    public AdminAuthService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Optional<AdminLoginResponse> login(AdminLoginRequest request) {
        return adminRepository.findByUsername(request.username())
                .filter(admin -> admin.getPassword().equals(request.password()))
                .map(admin -> {
                    String token = UUID.randomUUID().toString();
                    activeTokens.put(token, admin.getUsername());
                    return new AdminLoginResponse(token, admin.getUsername());
                });
    }

    public boolean isValid(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return false;
        }

        String token = authorizationHeader.substring("Bearer ".length());
        return activeTokens.containsKey(token);
    }
}
