package com.backend.fitlife.services.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsuarioDTO {
	private int id;
	private String nombre;
	private String email;
	private float altura;
	private float pesoActual;
	private int edad;
	private String genero;
}