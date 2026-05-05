package com.backend.fitlife.services.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlimentoDTO {
    private Long id;
    private String nombre;
    private String marca;
    private BigDecimal calorias;
    private BigDecimal proteinas;
    private BigDecimal carbohidratos;
    private BigDecimal grasas;
}
