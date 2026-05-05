package com.backend.fitlife.services;

import java.util.List;
import com.backend.fitlife.persistence.entities.PlanComida;
import com.backend.fitlife.persistence.repositories.PlanComidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanComidaService {

    @Autowired
    private PlanComidaRepository planComidaRepository;

    public List<PlanComida> getComidasByPlan(int planId) {
        return planComidaRepository.findByPlanId(planId);
    }

    public PlanComida assignComidaToPlan(PlanComida planComida) {
        return planComidaRepository.save(planComida);
    }
}