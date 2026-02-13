package com.backend.fitlife.services.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ComidaDTO {
	private int id;
	private String nombre;
	private String tipo;
	private float calorias;
	private float proteinas;
	private float grasas;
	private float carbohidratos;
}