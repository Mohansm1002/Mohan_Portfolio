package com.portfolio.repository;

import com.portfolio.entity.ProfessionalSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfessionalSkillRepository extends JpaRepository<ProfessionalSkill, Long> {
    List<ProfessionalSkill> findAllByOrderByDisplayOrderAscIdAsc();
}
