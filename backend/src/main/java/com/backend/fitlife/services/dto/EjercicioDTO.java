package com.backend.fitlife.services.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EjercicioDTO {
	private int id;
	private String nombre;
	private String grupoMuscular;
	private String descripcion;
}