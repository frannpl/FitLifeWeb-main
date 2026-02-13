package com.backend.fitlife.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.fitlife.persistence.entities.Comida;
import com.backend.fitlife.persistence.repositories.ComidaRepository;

@Service
public class ComidaService {

    @Autowired
    private ComidaRepository comidaRepository;

    public List<Comida> findAll() {
        return this.comidaRepository.findAll();
    }

    public Comida findById(int id) {
        return this.comidaRepository.findById(id).orElse(null);
    }

    public Comida save(Comida comida) {
        return this.comidaRepository.save(comida);
    }

    public void deleteById(int id) {
        this.comidaRepository.deleteById(id);
    }
}