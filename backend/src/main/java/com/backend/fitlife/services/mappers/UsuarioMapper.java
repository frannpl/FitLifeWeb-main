package com.backend.fitlife.services.mappers;

import org.springframework.stereotype.Component;
import com.backend.fitlife.persistence.entities.Usuario;
import com.backend.fitlife.services.dto.UsuarioDTO;

@Component
public class UsuarioMapper {
    public UsuarioDTO toDto(Usuario entity) {
        if (entity == null) return null;
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setEmail(entity.getEmail());
        dto.setAltura(entity.getAltura());
        dto.setPesoActual(entity.getPesoActual());
        dto.setEdad(entity.getEdad());
        dto.setGenero(entity.getGenero());
        return dto;
    }

    public Usuario toEntity(UsuarioDTO dto) {
        if (dto == null) return null;
        Usuario entity = new Usuario();
        entity.setId(dto.getId());
        entity.setNombre(dto.getNombre());
        entity.setEmail(dto.getEmail());
        entity.setAltura(dto.getAltura());
        entity.setPesoActual(dto.getPesoActual());
        entity.setEdad(dto.getEdad());
        entity.setGenero(dto.getGenero());
        return entity;
    }
}