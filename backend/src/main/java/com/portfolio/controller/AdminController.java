package com.portfolio.controller;

import com.portfolio.entity.*;
import com.portfolio.service.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ContactMessageService contactMessageService;
    private final SkillService skillService;
    private final ProfessionalSkillService professionalSkillService;
    private final ProjectService projectService;
    private final CertificationService certificationService;
    private final ProfileService profileService;

    public AdminController(
            ContactMessageService contactMessageService,
            SkillService skillService,
            ProfessionalSkillService professionalSkillService,
            ProjectService projectService,
            CertificationService certificationService,
            ProfileService profileService
    ) {
        this.contactMessageService = contactMessageService;
        this.skillService = skillService;
        this.professionalSkillService = professionalSkillService;
        this.projectService = projectService;
        this.certificationService = certificationService;
        this.profileService = profileService;
    }

    @GetMapping("/messages")
    public List<ContactMessage> getMessages() {
        return contactMessageService.findAll();
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Map<String, String>> deleteMessage(@PathVariable Long id) {
        contactMessageService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Message deleted"));
    }

    @PostMapping("/skills")
    public Skill createSkill(@Valid @RequestBody Skill skill) {
        return skillService.save(skill);
    }

    @PutMapping("/skills/{id}")
    public Skill updateSkill(@PathVariable Long id, @Valid @RequestBody Skill skill) {
        return skillService.update(id, skill);
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<Map<String, String>> deleteSkill(@PathVariable Long id) {
        skillService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Skill deleted"));
    }

    @PostMapping("/professional-skills")
    public ProfessionalSkill createProfessionalSkill(@Valid @RequestBody ProfessionalSkill skill) {
        return professionalSkillService.save(skill);
    }

    @PutMapping("/professional-skills/{id}")
    public ProfessionalSkill updateProfessionalSkill(@PathVariable Long id, @Valid @RequestBody ProfessionalSkill skill) {
        return professionalSkillService.update(id, skill);
    }

    @DeleteMapping("/professional-skills/{id}")
    public ResponseEntity<Map<String, String>> deleteProfessionalSkill(@PathVariable Long id) {
        professionalSkillService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Professional skill deleted"));
    }

    @PostMapping("/projects")
    public Project createProject(@Valid @RequestBody Project project) {
        return projectService.save(project);
    }

    @PutMapping("/projects/{id}")
    public Project updateProject(@PathVariable Long id, @Valid @RequestBody Project project) {
        return projectService.update(id, project);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Map<String, String>> deleteProject(@PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Project deleted"));
    }

    @PostMapping("/certifications")
    public Certification createCertification(@Valid @RequestBody Certification certification) {
        return certificationService.save(certification);
    }

    @PutMapping("/certifications/{id}")
    public Certification updateCertification(@PathVariable Long id, @Valid @RequestBody Certification certification) {
        return certificationService.update(id, certification);
    }

    @DeleteMapping("/certifications/{id}")
    public ResponseEntity<Map<String, String>> deleteCertification(@PathVariable Long id) {
        certificationService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Certification deleted"));
    }

    @PutMapping("/profile")
    public Profile updateProfile(@Valid @RequestBody Profile profile) {
        return profileService.update(profile);
    }
}
