package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173") // Vite dev server default port
public class ContactController {

    private final ContactMessageRepository repository;

    public ContactController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submitContact(@Valid @RequestBody ContactMessage message) {
        ContactMessage saved = repository.save(message);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return repository.findAll();
    }
}
