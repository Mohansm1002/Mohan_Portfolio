package com.portfolio.controller;

import com.portfolio.entity.*;
import com.portfolio.service.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PublicController {
    private final ProfileService profileService;
    private final SkillService skillService;
    private final ProfessionalSkillService professionalSkillService;
    private final ProjectService projectService;
    private final CertificationService certificationService;

    public PublicController(
            ProfileService profileService,
            SkillService skillService,
            ProfessionalSkillService professionalSkillService,
            ProjectService projectService,
            CertificationService certificationService
    ) {
        this.profileService = profileService;
        this.skillService = skillService;
        this.professionalSkillService = professionalSkillService;
        this.projectService = projectService;
        this.certificationService = certificationService;
    }

    @GetMapping("/profile")
    public Profile getProfile() {
        return profileService.getProfile();
    }

    @GetMapping("/skills")
    public List<Skill> getSkills() {
        return skillService.findAll();
    }

    @GetMapping("/professional-skills")
    public List<ProfessionalSkill> getProfessionalSkills() {
        return professionalSkillService.findAll();
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return projectService.findAll();
    }

    @GetMapping("/certifications")
    public List<Certification> getCertifications() {
        return certificationService.findAll();
    }
}
