package com.backend.fitlife.services.mappers;

import org.springframework.stereotype.Component;
import com.backend.fitlife.persistence.entities.Ejercicio;
import com.backend.fitlife.services.dto.EjercicioDTO;

@Component
public class EjercicioMapper {

	public EjercicioDTO toDto(Ejercicio entity) {
		if (entity == null)
			return null;
		EjercicioDTO dto = new EjercicioDTO();
		dto.setId(entity.getId());
		dto.setNombre(entity.getNombre());
		dto.setGrupoMuscular(entity.getGrupoMuscular());
		dto.setDescripcion(entity.getDescripcion());
		return dto;
	}

	public Ejercicio toEntity(EjercicioDTO dto) {
		if (dto == null)
			return null;
		Ejercicio entity = new Ejercicio();
		entity.setId(dto.getId());
		entity.setNombre(dto.getNombre());
		entity.setGrupoMuscular(dto.getGrupoMuscular());
		entity.setDescripcion(dto.getDescripcion());
		return entity;
	}
}