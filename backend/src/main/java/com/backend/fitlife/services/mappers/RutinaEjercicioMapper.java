package com.backend.fitlife.services.mappers;

import org.springframework.stereotype.Component;
import com.backend.fitlife.persistence.entities.RutinaEjercicio;
import com.backend.fitlife.persistence.entities.RutinaEjercicioId;
import com.backend.fitlife.services.dto.RutinaEjercicioDTO;

@Component
public class RutinaEjercicioMapper {
    public RutinaEjercicioDTO toDto(RutinaEjercicio entity) {
        if (entity == null) return null;
        RutinaEjercicioDTO dto = new RutinaEjercicioDTO();
        dto.setRutinaId(entity.getId().getRutinaId());
        dto.setEjercicioId(entity.getId().getEjercicioId());
        dto.setSeries(entity.getSeries());
        dto.setRepeticiones(entity.getRepeticiones());
        return dto;
    }

    public RutinaEjercicio toEntity(RutinaEjercicioDTO dto) {
        if (dto == null) return null;
        RutinaEjercicio entity = new RutinaEjercicio();
        RutinaEjercicioId id = new RutinaEjercicioId();
        id.setRutinaId(dto.getRutinaId());
        id.setEjercicioId(dto.getEjercicioId());
        entity.setId(id);
        entity.setSeries(dto.getSeries());
        entity.setRepeticiones(dto.getRepeticiones());
        return entity;
    }
}