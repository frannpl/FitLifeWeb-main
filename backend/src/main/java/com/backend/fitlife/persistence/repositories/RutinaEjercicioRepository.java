package com.backend.fitlife.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.fitlife.persistence.entities.RutinaEjercicio;
import com.backend.fitlife.persistence.entities.RutinaEjercicioId;

public interface RutinaEjercicioRepository extends JpaRepository<RutinaEjercicio, RutinaEjercicioId>{

	// Obtener todos los ejercicio de una rutina
	List<RutinaEjercicio> findByRutinaId(int rutinaId);
	
	// Obtener todas las rutinas donde aparece un ejercicio
	List<RutinaEjercicio> findByEjercicioId(int ejercicioId);
	
	// Borrar todos los ejercicios de una rutina
	void deleteByRutinaId(int rutinaId);
	
	// Borrar todas las apariciones de un ejercicio
	void deleteByEjercicioId(int ejercicioId);
}
