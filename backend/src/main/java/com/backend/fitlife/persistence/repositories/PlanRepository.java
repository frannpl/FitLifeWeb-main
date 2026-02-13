package com.backend.fitlife.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.fitlife.persistence.entities.Plan;

public interface PlanRepository extends JpaRepository<Plan, Integer> {

	// Buscar por nombre exacto
	List<Plan> findByNombrePlanIgnoreCase(String nombrePlan);

	// Buscar por coincidencia en el nombre
	List<Plan> findByNombrePlanContainingIgnoreCase(String nombrePlan);

	// Buscar planes por tipo de dieta
	List<Plan> findByTipoDietaIgnoreCase(String tipoDieta);

	// Busqueda parcial por descripcion
	List<Plan> findByDescripcionContainingIgnoreCase(String descripcion);
}
