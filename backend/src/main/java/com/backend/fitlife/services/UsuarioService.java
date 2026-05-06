package com.backend.fitlife.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.fitlife.persistence.entities.Usuario;
import com.backend.fitlife.persistence.repositories.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

	public List<Usuario> findAll() {
		return this.usuarioRepository.findAll();
	}

	public Usuario findById(int id) {
		return this.usuarioRepository.findById(id).orElse(null);
	}

	public Usuario findByEmail(String email) {
		return this.usuarioRepository.findByEmail(email).orElse(null);
	}

	public Usuario save(Usuario usuario) {
		if (usuario.getPassword() != null && !usuario.getPassword().startsWith("$2a$")) {
			usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
		}
		return this.usuarioRepository.save(usuario);
	}

	public void deleteById(int id) {
		this.usuarioRepository.deleteById(id);
	}
}