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

	public List<Usuario> findAll() {
		return this.usuarioRepository.findAll();
	}

	public Usuario findById(int id) {
		return this.usuarioRepository.findById(id).orElse(null);
	}

	public Usuario save(Usuario usuario) {
		return this.usuarioRepository.save(usuario);
	}

	public void deleteById(int id) {
		this.usuarioRepository.deleteById(id);
	}
}