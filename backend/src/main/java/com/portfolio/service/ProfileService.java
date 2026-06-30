package com.portfolio.service;

import com.portfolio.entity.Profile;
import com.portfolio.repository.ProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final ProfileRepository profileRepository;

    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public Profile getProfile() {
        return profileRepository.findFirstByOrderByIdAsc().orElseGet(Profile::new);
    }

    public Profile update(Profile profile) {
        Profile existing = getProfile();
        profile.setId(existing.getId());
        return profileRepository.save(profile);
    }
}
