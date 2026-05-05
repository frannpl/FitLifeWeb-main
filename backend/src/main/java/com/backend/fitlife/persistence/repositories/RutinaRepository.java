package com.backend.fitlife.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.fitlife.persistence.entities.Rutina;

public interface RutinaRepository extends JpaRepository<Rutina, Integer>{

	// Buscar por nombre exacto
	List<Rutina> findByNombreRutinaIgnoreCase(String nombreRutina);

	// Buscar por nombre parcial
	List<Rutina> findByNombreRutinaContainingIgnoreCase(String nombreRutina);
	
	// Filtrar por nivel (principiante, intermedio, avanzado etc)
	List<Rutina> findByNivelIgnoreCase(String nivel);
	
	// Busqueda parcial por descripcion
	List<Rutina> findByDescripcionContainingIgnoreCase(String descripcion);
}
