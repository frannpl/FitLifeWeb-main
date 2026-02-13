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
@Table(name = "plan")
@Getter
@Setter
@NoArgsConstructor
public class Plan {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 50, name="nombre_plan")
    private String nombrePlan;

    @Column(length = 30, name="tipo_dieta")
    private String tipoDieta;

    @Column(length = 120)
    private String descripcion;
}
