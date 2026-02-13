package com.backend.fitlife.persistence.entities;

import com.backend.fitlife.persistence.enums.ComidaHoraria;

import jakarta.persistence.Column;
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
@Table(name = "plan_comida")
@NoArgsConstructor
@Getter
@Setter
public class PlanComida {
	
	@EmbeddedId
	private PlanComidaId id;
	
	@ManyToOne
	@MapsId("planId")
	@JoinColumn(name = "id_plan")
	private Plan plan;
	
	@ManyToOne
	@MapsId("comidaId")
	@JoinColumn(name = "id_comida")
	private Comida comida;
	
	private int cantidad;
	
	@Column(name = "comidas_horarias", length = 20)
	private ComidaHoraria comidasHorarias; 
}
