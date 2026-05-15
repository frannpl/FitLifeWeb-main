package com.backend.fitlife.services.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsuarioDTO {
	private Integer id;
	private String nombre;
	private String email;
	private Float altura;
	private Float pesoActual;
	private Integer edad;
	private String genero;
	private String tarifa;
	private java.time.LocalDate fechaUltimaCita;
	private java.time.LocalDate fechaProximaCita;
	private Float porcentajeGrasa;
	private Float medidaPecho;
	private Float medidaCintura;
	private Float medidaBrazos;
	private Float medidaPiernas;
	private Boolean pro;
}