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
@Table(name = "rutina")
@Getter
@Setter
@NoArgsConstructor
public class Rutina {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 50 , name = "nombre_rutina")
    private String nombreRutina;

    @Column(length = 30)
    private String nivel;

    @Column(length = 120)
    private String descripcion;

    private int duracion;
}