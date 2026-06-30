package com.portfolio.service;

import com.portfolio.entity.ProfessionalSkill;
import com.portfolio.repository.ProfessionalSkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessionalSkillService {
    private final ProfessionalSkillRepository professionalSkillRepository;

    public ProfessionalSkillService(ProfessionalSkillRepository professionalSkillRepository) {
        this.professionalSkillRepository = professionalSkillRepository;
    }

    public List<ProfessionalSkill> findAll() {
        return professionalSkillRepository.findAllByOrderByDisplayOrderAscIdAsc();
    }

    public ProfessionalSkill save(ProfessionalSkill skill) {
        return professionalSkillRepository.save(skill);
    }

    public ProfessionalSkill update(Long id, ProfessionalSkill skill) {
        skill.setId(id);
        return professionalSkillRepository.save(skill);
    }

    public void delete(Long id) {
        professionalSkillRepository.deleteById(id);
    }
}
