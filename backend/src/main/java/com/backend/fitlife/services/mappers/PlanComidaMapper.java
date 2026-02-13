package com.backend.fitlife.services.mappers;

import org.springframework.stereotype.Component;
import com.backend.fitlife.persistence.entities.PlanComida;
import com.backend.fitlife.persistence.entities.PlanComidaId;
import com.backend.fitlife.services.dto.PlanComidaDTO;

@Component
public class PlanComidaMapper {
    public PlanComidaDTO toDto(PlanComida entity) {
        if (entity == null) return null;
        PlanComidaDTO dto = new PlanComidaDTO();
        dto.setPlanId(entity.getId().getPlanId());
        dto.setComidaId(entity.getId().getComidaId());
        dto.setCantidad(entity.getCantidad());
        dto.setComidasHorarias(entity.getComidasHorarias()); // Nombre corregido
        return dto;
    }

    public PlanComida toEntity(PlanComidaDTO dto) {
        if (dto == null) return null;
        PlanComida entity = new PlanComida();
        PlanComidaId id = new PlanComidaId();
        id.setPlanId(dto.getPlanId());
        id.setComidaId(dto.getComidaId());
        entity.setId(id);
        entity.setCantidad(dto.getCantidad());
        entity.setComidasHorarias(dto.getComidasHorarias()); // Nombre corregido
        return entity;
    }
}