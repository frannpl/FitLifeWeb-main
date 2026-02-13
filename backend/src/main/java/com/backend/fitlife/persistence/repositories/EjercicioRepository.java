package com.backend.fitlife.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.fitlife.persistence.entities.Ejercicio;

public interface EjercicioRepository extends JpaRepository<Ejercicio, Integer>{

	// Buscar ejercicios por nombre
	List<Ejercicio> findByNombreContainingIgnoreCase(String nombre);
	
	// Buscar por grupo muscular(pecho,piernas etc)
	List<Ejercicio> findByGrupoMuscularIgnoreCase(String grupoMuscular);
	
	// Buscar ejercicios por descripcion
	List<Ejercicio> findByDescripcionContainingIgnoreCase(String descripcion);
}
