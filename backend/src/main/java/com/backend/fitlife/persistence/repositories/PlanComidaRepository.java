package com.backend.fitlife.persistence.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.JpaRepositoryConfigExtension;
import org.springframework.stereotype.Repository;

import com.backend.fitlife.persistence.entities.PlanComida;
import com.backend.fitlife.persistence.entities.PlanComidaId;
import com.backend.fitlife.persistence.entities.RutinaEjercicio;
import com.backend.fitlife.persistence.entities.RutinaEjercicioId;

public interface PlanComidaRepository extends JpaRepository<PlanComida, PlanComidaId>{
	
	List<PlanComida> findByPlanId(int planId);
	
	List<PlanComida> findByComidaId(int comidaId);
}
