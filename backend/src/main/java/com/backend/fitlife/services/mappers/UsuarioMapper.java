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
        dto.setTarifa(entity.getTarifa());
        dto.setFechaUltimaCita(entity.getFechaUltimaCita());
        dto.setFechaProximaCita(entity.getFechaProximaCita());
        dto.setPorcentajeGrasa(entity.getPorcentajeGrasa());
        dto.setMedidaPecho(entity.getMedidaPecho());
        dto.setMedidaCintura(entity.getMedidaCintura());
        dto.setMedidaBrazos(entity.getMedidaBrazos());
        dto.setMedidaPiernas(entity.getMedidaPiernas());
        dto.setPro(entity.getPro());
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
        entity.setTarifa(dto.getTarifa());
        entity.setFechaUltimaCita(dto.getFechaUltimaCita());
        entity.setFechaProximaCita(dto.getFechaProximaCita());
        entity.setPorcentajeGrasa(dto.getPorcentajeGrasa());
        entity.setMedidaPecho(dto.getMedidaPecho());
        entity.setMedidaCintura(dto.getMedidaCintura());
        entity.setMedidaBrazos(dto.getMedidaBrazos());
        entity.setMedidaPiernas(dto.getMedidaPiernas());
        entity.setPro(dto.getPro());
        return entity;
    }
}