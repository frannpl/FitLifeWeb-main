package com.backend.fitlife.web.controllers;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.fitlife.services.PlanService;
import com.backend.fitlife.services.dto.PlanDTO;
import com.backend.fitlife.services.mappers.PlanMapper;

@RestController
@RequestMapping("/api/planes")
@CrossOrigin(origins = "*")
public class PlanController {

	@Autowired
	private PlanService planService;

	@Autowired
	private PlanMapper planMapper;

	@GetMapping
	public ResponseEntity<List<PlanDTO>> getAll() {
		return ResponseEntity
				.ok(this.planService.findAll().stream().map(this.planMapper::toDto).collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<PlanDTO> getById(@PathVariable int id) {
		PlanDTO dto = this.planMapper.toDto(this.planService.findById(id));
		return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public ResponseEntity<PlanDTO> create(@RequestBody PlanDTO dto) {
		return ResponseEntity.ok(this.planMapper.toDto(this.planService.save(this.planMapper.toEntity(dto))));
	}

	@PutMapping("/{id}")
	public ResponseEntity<PlanDTO> update(@PathVariable int id, @RequestBody PlanDTO dto) {
		if (this.planService.findById(id) == null)
			return ResponseEntity.notFound().build();
		dto.setId(id);
		return ResponseEntity.ok(this.planMapper.toDto(this.planService.save(this.planMapper.toEntity(dto))));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable int id) {
		if (this.planService.findById(id) == null)
			return ResponseEntity.notFound().build();
		this.planService.deleteById(id);
		return ResponseEntity.ok().build();
	}
}