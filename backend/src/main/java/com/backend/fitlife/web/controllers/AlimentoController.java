package com.backend.fitlife.web.controllers;

import com.backend.fitlife.services.AlimentoService;
import com.backend.fitlife.services.dto.AlimentoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/alimentos")
public class AlimentoController {

    @Autowired
    private AlimentoService service;

    @GetMapping("/search")
    public ResponseEntity<List<AlimentoDTO>> search(@RequestParam(name = "query", required = false) String query) {
        if (query == null || query.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        
        List<AlimentoDTO> results = service.buscarAlimento(query);
        return ResponseEntity.ok(results);
    }
}
