package com.backend.fitlife.web.controllers;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.fitlife.services.EjercicioService;
import com.backend.fitlife.services.dto.EjercicioDTO;
import com.backend.fitlife.services.mappers.EjercicioMapper;

@RestController
@RequestMapping("/api/ejercicios")
@CrossOrigin(origins = "*")
public class EjercicioController {

	@Autowired
	private EjercicioService service;

	@Autowired
	private EjercicioMapper mapper;

	@GetMapping
	public ResponseEntity<List<EjercicioDTO>> getAll() {
		return ResponseEntity.ok(this.service.findAll().stream().map(mapper::toDto).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<EjercicioDTO> getById(@PathVariable int id) {
		EjercicioDTO dto = this.mapper.toDto(this.service.findById(id));
		return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public ResponseEntity<EjercicioDTO> create(@RequestBody EjercicioDTO dto) {
		return ResponseEntity.ok(this.mapper.toDto(this.service.create(this.mapper.toEntity(dto))));
	}

	@PutMapping("/{id}")
	public ResponseEntity<EjercicioDTO> update(@PathVariable int id, @RequestBody EjercicioDTO dto) {
		if (this.service.findById(id) == null)
			return ResponseEntity.notFound().build();
		dto.setId(id);
		return ResponseEntity.ok(this.mapper.toDto(this.service.update(this.mapper.toEntity(dto))));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable int id) {
		this.service.deleteById(id);
		return ResponseEntity.ok().build();
	}
}