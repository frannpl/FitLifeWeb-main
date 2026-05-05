package com.backend.fitlife.services.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenFoodFactsResponse {
    private List<OpenFoodFactsProduct> products;
}
