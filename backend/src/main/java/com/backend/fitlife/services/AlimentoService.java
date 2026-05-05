package com.backend.fitlife.services;

import com.backend.fitlife.persistence.entities.Alimento;
import com.backend.fitlife.persistence.repositories.AlimentoRepository;
import com.backend.fitlife.services.dto.AlimentoDTO;
import com.backend.fitlife.services.dto.OpenFoodFactsResponse;
import com.backend.fitlife.services.dto.OpenFoodFactsProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlimentoService {

    @Autowired
    private AlimentoRepository repository;

    @Autowired
    private RestClient restClient;

    private static final String OFF_URL = "https://world.openfoodfacts.org/cgi/search.pl?search_terms={query}&search_simple=1&action=process&json=1";

    public List<AlimentoDTO> buscarAlimento(String query) {
        if (query == null || query.isBlank()) {
            return Collections.emptyList();
        }

        // Paso 1: Buscar en BD local
        List<Alimento> locales = repository.findByNombreContainingIgnoreCase(query);

        if (!locales.isEmpty()) {
            return locales.stream().map(this::mapToDTO).collect(Collectors.toList());
        }

        // Paso 2: Si no hay resultados, buscar en API externa
        try {
            OpenFoodFactsResponse response = restClient.get()
                    .uri(OFF_URL, query)
                    .header("User-Agent", "FitLifeWeb - SpringBoot - contact@fitlifeweb.com")
                    .retrieve()
                    .body(OpenFoodFactsResponse.class);

            if (response != null && response.getProducts() != null) {
                // Paso 3: Mapear y filtrar los primeros 5 validos
                List<Alimento> nuevosAlimentos = response.getProducts().stream()
                        .filter(this::isValidProduct)
                        .limit(5)
                        .map(this::mapToEntity)
                        .collect(Collectors.toList());

                // Paso 4: Guardar cache local (usando saveAll para persistir y obtener IDs)
                if (!nuevosAlimentos.isEmpty()) {
                    // Evitar duplicados por nombre si ya existen registros parciales
                    List<Alimento> aGuardar = nuevosAlimentos.stream()
                        .filter(n -> repository.findByNombreContainingIgnoreCase(n.getNombre()).isEmpty())
                        .collect(Collectors.toList());
                    
                    repository.saveAll(aGuardar);
                    return nuevosAlimentos.stream().map(this::mapToDTO).collect(Collectors.toList());
                }
            }
        } catch (Exception e) {
            // Log error or handle timeout
            System.err.println("Error calling Open Food Facts API: " + e.getMessage());
        }

        return Collections.emptyList();
    }

    private boolean isValidProduct(OpenFoodFactsProduct product) {
        return product.getProductName() != null && 
               product.getNutriments() != null &&
               product.getNutriments().getEnergyKcal100g() != null;
    }

    private Alimento mapToEntity(OpenFoodFactsProduct p) {
        Alimento a = new Alimento();
        a.setNombre(p.getProductName());
        a.setMarca(p.getBrands());
        a.setCalorias(p.getNutriments().getEnergyKcal100g());
        a.setProteinas(p.getNutriments().getProteins100g());
        a.setCarbohidratos(p.getNutriments().getCarbohydrates100g());
        a.setGrasas(p.getNutriments().getFat100g());
        return a;
    }

    private AlimentoDTO mapToDTO(Alimento a) {
        return AlimentoDTO.builder()
                .id(a.getId())
                .nombre(a.getNombre())
                .marca(a.getMarca())
                .calorias(a.getCalorias())
                .proteinas(a.getProteinas())
                .carbohidratos(a.getCarbohidratos())
                .grasas(a.getGrasas())
                .build();
    }
}
