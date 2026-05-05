package com.backend.fitlife.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.fitlife.persistence.entities.Nutricionista;
import com.backend.fitlife.persistence.repositories.NutricionistaRepository;

@Service
public class NutricionistaService {

	@Autowired
	private NutricionistaRepository nutricionistaRepository;

	public List<Nutricionista> findAll() {
		return this.nutricionistaRepository.findAll();
	}

	public Nutricionista findById(int id) {
		return this.nutricionistaRepository.findById(id).orElse(null);
	}

	public Nutricionista save(Nutricionista nutricionista) {
		return this.nutricionistaRepository.save(nutricionista);
	}

	public void deleteById(int id) {
		this.nutricionistaRepository.deleteById(id);
	}

	public Nutricionista findByEmail(String email) {
		return this.nutricionistaRepository.findByEmail(email).orElse(null);
	}
}