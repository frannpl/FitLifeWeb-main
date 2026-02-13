package com.backend.fitlife.web.controllers;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.fitlife.services.NutricionistaService;
import com.backend.fitlife.services.dto.NutricionistaDTO;
import com.backend.fitlife.services.mappers.NutricionistaMapper;

@RestController
@RequestMapping("/api/nutricionistas")
@CrossOrigin(origins = "*")
public class NutricionistaController {

	@Autowired
	private NutricionistaService nutricionistaService;

	@Autowired
	private NutricionistaMapper nutricionistaMapper;

	@GetMapping
	public ResponseEntity<List<NutricionistaDTO>> getAll() {
		return ResponseEntity.ok(this.nutricionistaService.findAll().stream().map(this.nutricionistaMapper::toDto)
				.collect(Collectors.toList()));
	}

	@GetMapping("/{id}")
	public ResponseEntity<NutricionistaDTO> getById(@PathVariable int id) {
		NutricionistaDTO dto = this.nutricionistaMapper.toDto(this.nutricionistaService.findById(id));
		return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
	}

	@PostMapping
	public ResponseEntity<NutricionistaDTO> create(@RequestBody NutricionistaDTO dto) {
		var entity = this.nutricionistaMapper.toEntity(dto);
		return ResponseEntity.ok(this.nutricionistaMapper.toDto(this.nutricionistaService.save(entity)));
	}

	@PutMapping("/{id}")
	public ResponseEntity<NutricionistaDTO> update(@PathVariable int id, @RequestBody NutricionistaDTO dto) {
		if (this.nutricionistaService.findById(id) == null)
			return ResponseEntity.notFound().build();
		dto.setId(id);
		return ResponseEntity.ok(
				this.nutricionistaMapper.toDto(this.nutricionistaService.save(this.nutricionistaMapper.toEntity(dto))));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable int id) {
		if (this.nutricionistaService.findById(id) == null)
			return ResponseEntity.notFound().build();
		this.nutricionistaService.deleteById(id);
		return ResponseEntity.ok().build();
	}
}