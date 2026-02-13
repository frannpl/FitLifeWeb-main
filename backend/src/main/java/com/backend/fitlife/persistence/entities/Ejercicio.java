package com.backend.fitlife.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ejercicio")
@Getter
@Setter
@NoArgsConstructor
public class Ejercicio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(length = 50)
	private String nombre;
	
	@Column(length = 50, name = "grupo_muscular")
	private String grupoMuscular;
	
	@Column(length = 120)
	private String descripcion;
	
	
}
