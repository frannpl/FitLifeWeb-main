package com.backend.fitlife.web.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.fitlife.persistence.entities.Usuario;
import com.backend.fitlife.services.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@GetMapping
	public ResponseEntity<List<Usuario>> getAll() {
		return ResponseEntity.ok(this.usuarioService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Usuario> getById(@PathVariable int id) {
		Usuario usuario = this.usuarioService.findById(id);
		if (usuario != null) {
			return ResponseEntity.ok(usuario);
		}
		return ResponseEntity.notFound().build();
	}

	@GetMapping("/email/{email}")
	public ResponseEntity<Usuario> getByEmail(@PathVariable String email) {
		Usuario usuario = this.usuarioService.findByEmail(email);
		if (usuario != null) {
			return ResponseEntity.ok(usuario);
		}
		return ResponseEntity.notFound().build();
	}

	@PostMapping
	public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
		return ResponseEntity.ok(this.usuarioService.save(usuario));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Usuario> update(@PathVariable int id, @RequestBody Usuario usuario) {
		if (this.usuarioService.findById(id) == null) {
			return ResponseEntity.notFound().build();
		}
		usuario.setId(id);
		return ResponseEntity.ok(this.usuarioService.save(usuario));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable int id) {
		this.usuarioService.deleteById(id);
		return ResponseEntity.ok().build();
	}
}