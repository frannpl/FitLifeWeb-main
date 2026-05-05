package com.backend.fitlife.services.mappers;

import org.springframework.stereotype.Component;
import com.backend.fitlife.persistence.entities.Nutricionista;
import com.backend.fitlife.services.dto.NutricionistaDTO;

@Component
public class NutricionistaMapper {

    public NutricionistaDTO toDto(Nutricionista entity) {
        if (entity == null) return null;
        NutricionistaDTO dto = new NutricionistaDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setEmail(entity.getEmail());
        return dto;
    }

    public Nutricionista toEntity(NutricionistaDTO dto) {
        if (dto == null) return null;
        Nutricionista entity = new Nutricionista();
        entity.setId(dto.getId());
        entity.setNombre(dto.getNombre());
        entity.setEmail(dto.getEmail());
        // El password no se mapea desde el DTO por seguridad en este flujo
        return entity;
    }
}