package com.backend.fitlife.persistence.entities;

import jakarta.annotation.Generated;
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
@Table(name = "comida")
@Getter
@Setter
@NoArgsConstructor
public class Comida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 50)
    private String nombre;

    @Column(length = 30)
    private String tipo;

    private float calorias;
    private float proteinas;
    private float grasas;
    private float carbohidratos;
}
