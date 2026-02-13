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
@Table(name= "usuario")
@Getter
@Setter
@NoArgsConstructor
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(length = 50)
	private String nombre;
	
	private float altura;
	
	@Column(length = 100)
	private String email;
	
	@Column(length = 60)
	private String password;
	
	@Column(length = 10)
	private String genero;

	@Column(name = "peso_actual")
	private float pesoActual;
	
	private int edad;
}
