package com.backend.fitlife.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.fitlife.persistence.entities.Plan;
import com.backend.fitlife.persistence.repositories.PlanRepository;

@Service
public class PlanService {

	@Autowired
	private PlanRepository planRepository;

	public List<Plan> findAll() {
		return this.planRepository.findAll();
	}

	public Plan findById(int id) {
		return this.planRepository.findById(id).orElse(null);
	}

	public Plan save(Plan plan) {
		return this.planRepository.save(plan);
	}

	public void deleteById(int id) {
		this.planRepository.deleteById(id);
	}
}