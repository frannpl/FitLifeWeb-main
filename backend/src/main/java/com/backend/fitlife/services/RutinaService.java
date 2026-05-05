package com.backend.fitlife.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.fitlife.persistence.entities.Rutina;
import com.backend.fitlife.persistence.repositories.RutinaRepository;

@Service
public class RutinaService {

	@Autowired
	private RutinaRepository repository;

	public List<Rutina> findAll() {
		return this.repository.findAll();
	}

	public Rutina findById(int id) {
		return this.repository.findById(id).orElse(null);
	}

	public Rutina create(Rutina rutina) {
		return this.repository.save(rutina);
	}

	public Rutina update(Rutina rutina) {
		return this.repository.save(rutina);
	}

	public void deleteById(int id) {
		this.repository.deleteById(id);
	}
}