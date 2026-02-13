package com.backend.fitlife.services.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlanDTO {
	private int id;
	private String nombrePlan;
	private String tipoDieta;
	private String descripcion;
}