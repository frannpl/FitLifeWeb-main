package com.backend.fitlife.web.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.fitlife.services.ComidaService;
import com.backend.fitlife.services.dto.ComidaDTO;
import com.backend.fitlife.services.mappers.ComidaMapper;

@RestController
@RequestMapping("/api/comidas")
@CrossOrigin(origins = "*")
public class ComidaController {

    @Autowired
    private ComidaService comidaService;

    @Autowired
    private ComidaMapper comidaMapper;

    @GetMapping
    public ResponseEntity<List<ComidaDTO>> getAll() {
        return ResponseEntity.ok(
                this.comidaService.findAll().stream()
                        .map(this.comidaMapper::toDto)
                        .collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComidaDTO> getById(@PathVariable int id) {
        if (this.comidaService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(this.comidaMapper.toDto(this.comidaService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<ComidaDTO> create(@RequestBody ComidaDTO dto) {
        return ResponseEntity.ok(this.comidaMapper.toDto(
                this.comidaService.save(this.comidaMapper.toEntity(dto))));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComidaDTO> update(@PathVariable int id, @RequestBody ComidaDTO dto) {
        if (this.comidaService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        dto.setId(id);
        return ResponseEntity.ok(this.comidaMapper.toDto(
                this.comidaService.save(this.comidaMapper.toEntity(dto))));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        if (this.comidaService.findById(id) == null) {
            return ResponseEntity.notFound().build();
        }
        this.comidaService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
