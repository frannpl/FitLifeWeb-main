package com.backend.fitlife.persistence.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rutina_ejercicio")
@Getter
@Setter
@NoArgsConstructor
public class RutinaEjercicio {
	
	@EmbeddedId
	private RutinaEjercicioId id;
	
	@ManyToOne
	@MapsId("rutinaId")
	@JoinColumn(name = "id_rutina")
	private Rutina rutina;
	
	@ManyToOne
	@MapsId("ejercicioId")
	@JoinColumn(name = "id_ejercicio")
	private Ejercicio ejercicio;
	
	private int repeticiones;
	
	private int series;
}
