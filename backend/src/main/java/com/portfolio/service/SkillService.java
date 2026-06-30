package com.portfolio.service;

import com.portfolio.entity.Skill;
import com.portfolio.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {
    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<Skill> findAll() {
        return skillRepository.findAllByOrderByDisplayOrderAscIdAsc();
    }

    public Skill save(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill update(Long id, Skill skill) {
        skill.setId(id);
        return skillRepository.save(skill);
    }

    public void delete(Long id) {
        skillRepository.deleteById(id);
    }
}
