package com.backend.fitlife.services.dto;

import com.backend.fitlife.persistence.enums.ComidaHoraria;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PlanComidaDTO {
	private int planId;
	private int comidaId;
	private int cantidad;
	private ComidaHoraria comidasHorarias; // Usamos el Enum directamente
}