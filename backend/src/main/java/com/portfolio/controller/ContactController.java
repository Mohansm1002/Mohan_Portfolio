package com.portfolio.controller;

import com.portfolio.entity.ContactMessage;
import com.portfolio.service.ContactMessageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageService contactMessageService;

    public ContactController(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submitContact(@Valid @RequestBody ContactMessage message) {
        return ResponseEntity.ok(contactMessageService.save(message));
    }
}
