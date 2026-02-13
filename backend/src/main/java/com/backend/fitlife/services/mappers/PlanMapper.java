package com.backend.fitlife.services.mappers;

import org.springframework.stereotype.Component;
import com.backend.fitlife.persistence.entities.Plan;
import com.backend.fitlife.services.dto.PlanDTO;

@Component
public class PlanMapper {

    public PlanDTO toDto(Plan entity) {
        if (entity == null) return null;
        PlanDTO dto = new PlanDTO();
        dto.setId(entity.getId());
        dto.setNombrePlan(entity.getNombrePlan());
        dto.setTipoDieta(entity.getTipoDieta());
        dto.setDescripcion(entity.getDescripcion());
        return dto;
    }

    public Plan toEntity(PlanDTO dto) {
        if (dto == null) return null;
        Plan entity = new Plan();
        entity.setId(dto.getId());
        entity.setNombrePlan(dto.getNombrePlan());
        entity.setTipoDieta(dto.getTipoDieta());
        entity.setDescripcion(dto.getDescripcion());
        return entity;
    }
}