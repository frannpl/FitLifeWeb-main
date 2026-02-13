package com.backend.fitlife.services.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RutinaDTO {
	private int id;
	private String nombreRutina;
	private String nivel;
	private String descripcion;
	private int duracion;
}