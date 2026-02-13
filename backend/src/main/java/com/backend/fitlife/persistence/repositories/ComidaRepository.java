package com.backend.fitlife.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.fitlife.persistence.entities.Comida;

public interface ComidaRepository extends JpaRepository<Comida, Integer>{

	// Buscar comidas por tipo(desayuno,almuerzo etc)
	List<Comida> findByTipo(String tipo);
	
	// Buscar comidas que contengan un nombre similar
	List<Comida> findByNombreContainingIgnoreCase(String nombre);
}
