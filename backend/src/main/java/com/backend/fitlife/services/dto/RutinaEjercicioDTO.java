package com.backend.fitlife.services.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class RutinaEjercicioDTO {
    private int rutinaId;
    private int ejercicioId;
    private int series;
    private int repeticiones;
}