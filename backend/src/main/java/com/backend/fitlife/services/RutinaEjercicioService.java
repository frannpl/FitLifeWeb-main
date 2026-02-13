package com.backend.fitlife.services;

import java.util.List;
import com.backend.fitlife.persistence.entities.RutinaEjercicio;
import com.backend.fitlife.persistence.repositories.RutinaEjercicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RutinaEjercicioService {

    @Autowired
    private RutinaEjercicioRepository repository;

    public List<RutinaEjercicio> findByRutina(int rutinaId) {
        return repository.findByRutinaId(rutinaId);
    }

    public RutinaEjercicio save(RutinaEjercicio re) {
        return repository.save(re);
    }

    @Transactional
    public void deleteByRutina(int rutinaId) {
        repository.deleteByRutinaId(rutinaId);
    }
}