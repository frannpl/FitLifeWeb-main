package com.backend.fitlife.services.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenFoodFactsProduct {
    @JsonProperty("product_name")
    private String productName;
    
    private String brands;
    
    private Nutriments nutriments;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Nutriments {
        @JsonProperty("energy-kcal_100g")
        private BigDecimal energyKcal100g;
        
        @JsonProperty("proteins_100g")
        private BigDecimal proteins100g;
        
        @JsonProperty("carbohydrates_100g")
        private BigDecimal carbohydrates100g;
        
        @JsonProperty("fat_100g")
        private BigDecimal fat100g;
    }
}
