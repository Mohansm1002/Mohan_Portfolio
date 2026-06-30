package com.portfolio.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "certifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Certification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    private String issuer;
    private String date;
    private String score;
    private String duration;
    private String roll;
    private String credits;
    private String imageKey;
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    private int displayOrder;
}
