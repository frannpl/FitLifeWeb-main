package com.backend.fitlife.services.mappers;

import org.springframework.stereotype.Component;
import com.backend.fitlife.persistence.entities.Comida;
import com.backend.fitlife.services.dto.ComidaDTO;

@Component
public class ComidaMapper {

    public ComidaDTO toDto(Comida entity) {
        if (entity == null) return null;
        ComidaDTO dto = new ComidaDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setTipo(entity.getTipo());
        dto.setCalorias(entity.getCalorias());
        dto.setProteinas(entity.getProteinas());
        dto.setGrasas(entity.getGrasas());
        dto.setCarbohidratos(entity.getCarbohidratos());
        return dto;
    }

    public Comida toEntity(ComidaDTO dto) {
        if (dto == null) return null;
        Comida entity = new Comida();
        entity.setId(dto.getId());
        entity.setNombre(dto.getNombre());
        entity.setTipo(dto.getTipo());
        entity.setCalorias(dto.getCalorias());
        entity.setProteinas(dto.getProteinas());
        entity.setGrasas(dto.getGrasas());
        entity.setCarbohidratos(dto.getCarbohidratos());
        return entity;
    }
}