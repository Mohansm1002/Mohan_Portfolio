package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String heroIntro;
    private String name;
    private String role;

    @Column(columnDefinition = "TEXT")
    private String heroCopy;

    private String aboutHeading;

    @Column(columnDefinition = "TEXT")
    private String aboutParagraphOne;

    @Column(columnDefinition = "TEXT")
    private String aboutParagraphTwo;

    private String resumeLink;
    private String email;
    private String phone;
    private String facebookUrl;
    private String githubUrl;
    private String linkedinUrl;
    private String instagramUrl;
}
