package com.portfolio.service;

import com.portfolio.entity.Certification;
import com.portfolio.repository.CertificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificationService {
    private final CertificationRepository certificationRepository;

    public CertificationService(CertificationRepository certificationRepository) {
        this.certificationRepository = certificationRepository;
    }

    public List<Certification> findAll() {
        return certificationRepository.findAllByOrderByDisplayOrderAscIdAsc();
    }

    public Certification save(Certification certification) {
        return certificationRepository.save(certification);
    }

    public Certification update(Long id, Certification certification) {
        certification.setId(id);
        return certificationRepository.save(certification);
    }

    public void delete(Long id) {
        certificationRepository.deleteById(id);
    }
}
