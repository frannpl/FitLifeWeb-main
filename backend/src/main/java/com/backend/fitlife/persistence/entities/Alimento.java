package com.backend.fitlife.persistence.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "alimento")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Alimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nombre;

    private String marca;

    @Column(precision = 10, scale = 2)
    private BigDecimal calorias;

    @Column(precision = 10, scale = 2)
    private BigDecimal proteinas;

    @Column(precision = 10, scale = 2)
    private BigDecimal carbohidratos;

    @Column(precision = 10, scale = 2)
    private BigDecimal grasas;
}
