package com.backend.fitlife.web.controllers;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.fitlife.services.RutinaEjercicioService;
import com.backend.fitlife.services.dto.RutinaEjercicioDTO;
import com.backend.fitlife.services.mappers.RutinaEjercicioMapper;

@RestController
@RequestMapping("/api/rutina-ejercicio")
@CrossOrigin(origins = "*")
public class RutinaEjercicioController {

	@Autowired
	private RutinaEjercicioService service;

	@Autowired
	private RutinaEjercicioMapper mapper;

	@GetMapping("/rutina/{id}")
	public ResponseEntity<List<RutinaEjercicioDTO>> getByRutina(@PathVariable int id) {
		return ResponseEntity
				.ok(this.service.findByRutina(id).stream().map(this.mapper::toDto).collect(Collectors.toList()));
	}

	@PostMapping
	public ResponseEntity<RutinaEjercicioDTO> assign(@RequestBody RutinaEjercicioDTO dto) {
		var entity = this.mapper.toEntity(dto);
		return ResponseEntity.ok(this.mapper.toDto(this.service.save(entity)));
	}
}