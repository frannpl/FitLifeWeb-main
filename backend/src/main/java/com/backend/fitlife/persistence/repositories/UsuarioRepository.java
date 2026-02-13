package com.backend.fitlife.persistence.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.fitlife.persistence.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
	List<Usuario> findByNombreIgnoreCase(String nombre);

	Optional<Usuario> findByEmail(String email);

	boolean existsByEmail(String email);
}