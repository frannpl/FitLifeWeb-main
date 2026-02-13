package com.backend.fitlife.persistence.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.fitlife.persistence.entities.Nutricionista;

public interface NutricionistaRepository extends JpaRepository<Nutricionista, Integer>{

	// Buscar nutricionista por nombre 
	List<Nutricionista> findByNombreContainingIgnoreCase(String nombre);
	
	// Buscar por email
	Optional<Nutricionista> findByEmail(String email);
	
	// Comprobar si ya existe un email
	boolean existsByEmail(String email);
}
