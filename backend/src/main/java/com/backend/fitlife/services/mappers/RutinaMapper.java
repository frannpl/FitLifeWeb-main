package com.backend.fitlife.services.mappers;

import org.springframework.stereotype.Component;
import com.backend.fitlife.persistence.entities.Rutina;
import com.backend.fitlife.services.dto.RutinaDTO;

@Component
public class RutinaMapper {

    public RutinaDTO toDto(Rutina entity) {
        if (entity == null) return null;
        RutinaDTO dto = new RutinaDTO();
        dto.setId(entity.getId());
        dto.setNombreRutina(entity.getNombreRutina());
        dto.setNivel(entity.getNivel());
        dto.setDescripcion(entity.getDescripcion());
        dto.setDuracion(entity.getDuracion());
        return dto;
    }

    public Rutina toEntity(RutinaDTO dto) {
        if (dto == null) return null;
        Rutina entity = new Rutina();
        entity.setId(dto.getId());
        entity.setNombreRutina(dto.getNombreRutina());
        entity.setNivel(dto.getNivel());
        entity.setDescripcion(dto.getDescripcion());
        entity.setDuracion(dto.getDuracion());
        return entity;
    }
}