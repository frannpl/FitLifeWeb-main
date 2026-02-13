package com.backend.fitlife.persistence.entities;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class RutinaEjercicioId implements Serializable{
	
	private int rutinaId;
	private int ejercicioId;
}
