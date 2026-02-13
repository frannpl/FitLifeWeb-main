package com.backend.fitlife.web.controllers;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.fitlife.services.RutinaService;
import com.backend.fitlife.services.dto.RutinaDTO;
import com.backend.fitlife.services.mappers.RutinaMapper;

@RestController
@RequestMapping("/api/rutinas")
@CrossOrigin(origins = "*")
public class RutinaController {

    @Autowired
    private RutinaService service;

    @Autowired
    private RutinaMapper mapper;

    @GetMapping
    public ResponseEntity<List<RutinaDTO>> getAll() {
        return ResponseEntity.ok(this.service.findAll().stream()
                .map(mapper::toDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RutinaDTO> getById(@PathVariable int id) {
        RutinaDTO dto = this.mapper.toDto(this.service.findById(id));
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<RutinaDTO> create(@RequestBody RutinaDTO dto) {
        return ResponseEntity.ok(this.mapper.toDto(this.service.create(this.mapper.toEntity(dto))));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RutinaDTO> update(@PathVariable int id, @RequestBody RutinaDTO dto) {
        if (this.service.findById(id) == null) return ResponseEntity.notFound().build();
        dto.setId(id);
        return ResponseEntity.ok(this.mapper.toDto(this.service.update(this.mapper.toEntity(dto))));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        this.service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}