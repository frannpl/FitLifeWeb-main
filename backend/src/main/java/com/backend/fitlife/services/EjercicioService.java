package com.backend.fitlife.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.fitlife.persistence.entities.Ejercicio;
import com.backend.fitlife.persistence.repositories.EjercicioRepository;

@Service
public class EjercicioService {

    @Autowired
    private EjercicioRepository repository;

    public List<Ejercicio> findAll() {
        return this.repository.findAll();
    }

    public Ejercicio findById(int id) {
        return this.repository.findById(id).orElse(null);
    }

    public Ejercicio create(Ejercicio ejercicio) {
        return this.repository.save(ejercicio);
    }

    public Ejercicio update(Ejercicio ejercicio) {
        return this.repository.save(ejercicio);
    }

    public void deleteById(int id) {
        this.repository.deleteById(id);
    }
}