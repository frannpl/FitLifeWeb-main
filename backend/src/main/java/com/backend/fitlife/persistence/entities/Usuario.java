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
	
	private Float altura;
	
	@Column(length = 100)
	private String email;
	
	@Column(length = 60)
	private String password;
	
	@Column(length = 10)
	private String genero;

	@Column(name = "peso_actual")
	private Float pesoActual;
	
	private Integer edad;

	@Column(length = 20)
	private String tarifa;

	@Column(name = "fecha_ultima_cita")
	private java.time.LocalDate fechaUltimaCita;

	@Column(name = "fecha_proxima_cita")
	private java.time.LocalDate fechaProximaCita;

	@Column(name = "porcentaje_grasa")
	private Float porcentajeGrasa;

	@Column(name = "medida_pecho")
	private Float medidaPecho;

	@Column(name = "medida_cintura")
	private Float medidaCintura;

	@Column(name = "medida_brazos")
	private Float medidaBrazos;

	@Column(name = "medida_piernas")
	private Float medidaPiernas;

	@Column(name = "is_pro")
	private Boolean pro;
}
