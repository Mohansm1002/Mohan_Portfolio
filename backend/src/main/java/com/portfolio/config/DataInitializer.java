package com.portfolio.config;

import com.portfolio.entity.*;
import com.portfolio.repository.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    private final AdminRepository adminRepository;
    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProfessionalSkillRepository professionalSkillRepository;
    private final ProjectRepository projectRepository;
    private final CertificationRepository certificationRepository;

    @Value("${app.admin.default-username}")
    private String defaultAdminUsername;

    @Value("${app.admin.default-password}")
    private String defaultAdminPassword;

    public DataInitializer(
            AdminRepository adminRepository,
            ProfileRepository profileRepository,
            SkillRepository skillRepository,
            ProfessionalSkillRepository professionalSkillRepository,
            ProjectRepository projectRepository,
            CertificationRepository certificationRepository
    ) {
        this.adminRepository = adminRepository;
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.professionalSkillRepository = professionalSkillRepository;
        this.projectRepository = projectRepository;
        this.certificationRepository = certificationRepository;
    }

    @Override
    public void run(String... args) {
        seedAdmin();
        seedProfile();
        seedSkills();
        seedProfessionalSkills();
        seedProjects();
        seedCertifications();
    }

    private void seedAdmin() {
        adminRepository.findByUsername(defaultAdminUsername).orElseGet(() ->
                adminRepository.save(new Admin(null, defaultAdminUsername, defaultAdminPassword, null))
        );
    }

    private void seedProfile() {
        if (profileRepository.count() > 0) {
            return;
        }

        Profile profile = new Profile();
        profile.setHeroIntro("Hello, It's Me");
        profile.setName("MOHAN S");
        profile.setRole("Frontend Developer");
        profile.setHeroCopy("B.Tech IT student and frontend developer skilled in HTML, CSS, JavaScript, React.js, Java, Python, and MySQL, focused on building responsive and user-friendly web applications.");
        profile.setAboutHeading("Full Stack Developer!");
        profile.setAboutParagraphOne("I am a B.Tech Information Technology student from Francis Xavier Engineering College with strong interest in frontend development and full-stack application building. I enjoy turning ideas into clean, responsive interfaces using HTML, CSS, JavaScript, and React.js.");
        profile.setAboutParagraphTwo("Through my internship at Wizbees Technologies and academic projects, I have built food delivery, ticket booking, and machine learning based applications while practicing problem-solving, time management, and user-focused design.");
        profile.setResumeLink("#contact");
        profile.setEmail("mohansm1002@gmail.com");
        profile.setPhone("+91 6380751915");
        profile.setFacebookUrl("https://www.facebook.com/profile.php?id=100071509903847");
        profile.setGithubUrl("https://github.com/Mohansm1002");
        profile.setLinkedinUrl("https://www.linkedin.com/in/mohan-mohan-b45222259?utm_source=share_via&utm_content=profile&utm_medium=member_android");
        profile.setInstagramUrl("https://www.instagram.com/__call__me__mohan_?igsh=MXd5bHpiOHBoamQxMA==");
        profileRepository.save(profile);
    }

    private void seedSkills() {
        if (skillRepository.count() > 0) {
            return;
        }

        skillRepository.saveAll(List.of(
                new Skill(null, "Java", 90, "Java", "java", null, 1),
                new Skill(null, "HTML", 90, "HTML", "html", null, 2),
                new Skill(null, "CSS", 90, "CSS", "css", null, 3),
                new Skill(null, "Python", 80, "Python", "python", null, 4),
                new Skill(null, "MySQL", 80, "SQL", "sql", null, 5),
                new Skill(null, "JavaScript", 70, "JavaScript", "javascript", null, 6),
                new Skill(null, "React.js", 70, "React", "react", null, 7)
        ));
    }

    private void seedProfessionalSkills() {
        if (professionalSkillRepository.count() > 0) {
            return;
        }

        professionalSkillRepository.saveAll(List.of(
                new ProfessionalSkill(null, "Time Management", 90, 1),
                new ProfessionalSkill(null, "Teamwork", 85, 2),
                new ProfessionalSkill(null, "Communication", 75, 3),
                new ProfessionalSkill(null, "Problem Solving", 75, 4)
        ));
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) {
            return;
        }

        Project food = new Project();
        food.setTitle("Food Delivery Application");
        food.setStack("HTML, CSS, React.js");
        food.setType("Frontend application");
        food.setAccent("food");
        food.setImageKey("food_delivery");
        food.setDescription("A responsive food delivery web application for browsing menus and placing orders with a smooth customer experience.");
        food.setTechnologies(List.of(
                new ProjectTechnology("HTML", "html", "html"),
                new ProjectTechnology("CSS", "css", "css"),
                new ProjectTechnology("React.js", "react", "react")
        ));
        food.setHighlights(List.of(
                "Designed user-friendly restaurant and menu screens with HTML and CSS.",
                "Built cart update flows for real-time item changes.",
                "Structured the React interface for scalable, reusable components."
        ));
        food.setDisplayOrder(1);

        Project train = new Project();
        train.setTitle("Train Ticket Booking System");
        train.setStack("Java");
        train.setType("Booking system");
        train.setAccent("train");
        train.setImageKey("train_ticket");
        train.setDescription("A console-based ticket booking system for reserving and managing train tickets with clear object-oriented structure.");
        train.setTechnologies(List.of(new ProjectTechnology("Java", "java", "java")));
        train.setHighlights(List.of(
                "Implemented user input handling, seat availability checks, booking, and cancellation.",
                "Applied object-oriented programming concepts for maintainable logic.",
                "Organized the flow to make ticket management simple and reliable."
        ));
        train.setDisplayOrder(2);

        Project laptop = new Project();
        laptop.setTitle("Laptop Price Prediction");
        laptop.setStack("Python, Machine Learning");
        laptop.setType("Prediction model");
        laptop.setAccent("laptop");
        laptop.setImageKey("laptop_price");
        laptop.setDescription("A machine learning application that predicts laptop prices from specifications and presents results through an interactive UI.");
        laptop.setTechnologies(List.of(
                new ProjectTechnology("Python", "python", "python"),
                new ProjectTechnology("Machine Learning", "ml", "ml")
        ));
        laptop.setHighlights(List.of(
                "Trained a Random Forest model for improved price prediction accuracy.",
                "Prepared specification-based inputs for real-time predictions.",
                "Built a user-friendly interface for quick laptop price estimation."
        ));
        laptop.setDisplayOrder(3);

        projectRepository.saveAll(List.of(food, train, laptop));
    }

    private void seedCertifications() {
        if (certificationRepository.count() > 0) {
            return;
        }

        certificationRepository.saveAll(List.of(
                new Certification(null, "The Joy of Computing Using Python", "NPTEL (IIT Madras)", "Jul - Oct 2024", "53%", "12 Weeks", "NPTEL24CS113S853000629", "3 or 4", "nptel_pyt_cer", null, "Learned Python programming fundamentals, data structures, problem solving and real-world applications.", 1),
                new Certification(null, "Cybernaut's Tech Trio Course on Java", "Cybernaut Edu-Tech LLP", "25 Sep 2024", "85%", "Self-paced", "CYB-JAVA-2024", "Verified", "java_c", null, "Completed comprehensive Java course covering OOP, Collections, Exception Handling, and core Java concepts.", 2),
                new Certification(null, "Cybernaut's Tech Trio Course on Python", "Cybernaut Edu-Tech LLP", "14 Nov 2024", "88%", "Self-paced", "CYB-PY-2024", "Verified", "python_c", null, "Completed comprehensive Python course covering data structures, problem solving and Python programming fundamentals.", 3)
        ));
    }
}
