package com.backend.fitlife.web.controllers;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.fitlife.services.PlanComidaService;
import com.backend.fitlife.services.dto.PlanComidaDTO;
import com.backend.fitlife.services.mappers.PlanComidaMapper;

@RestController
@RequestMapping("/api/plan-comida")
@CrossOrigin(origins = "*")
public class PlanComidaController {

	@Autowired
	private PlanComidaService service;

	@Autowired
	private PlanComidaMapper mapper;

	@GetMapping("/plan/{id}")
	public ResponseEntity<List<PlanComidaDTO>> getByPlan(@PathVariable int id) {
		return ResponseEntity
				.ok(this.service.getComidasByPlan(id).stream().map(this.mapper::toDto).collect(Collectors.toList()));
	}

	@PostMapping
	public ResponseEntity<PlanComidaDTO> save(@RequestBody PlanComidaDTO dto) {
		var entity = this.mapper.toEntity(dto);
		return ResponseEntity.ok(this.mapper.toDto(this.service.assignComidaToPlan(entity)));
	}
}