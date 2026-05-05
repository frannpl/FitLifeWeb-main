package com.backend.fitlife.config;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.backend.fitlife.persistence.entities.Plan;
import com.backend.fitlife.persistence.repositories.PlanRepository;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(PlanRepository planRepository) {
        return args -> {
            if (planRepository.count() == 0) {
                Plan p1 = new Plan();
                p1.setNombrePlan("Pérdida de Peso");
                p1.setTipoDieta("Hipocalórica");
                p1.setDescripcion("Plan diseñado para reducir grasa corporal de forma saludable.");

                Plan p2 = new Plan();
                p2.setNombrePlan("Ganancia Muscular");
                p2.setTipoDieta("Hiperprotéica");
                p2.setDescripcion("Maximiza el crecimiento muscular con este plan rico en proteínas.");

                Plan p3 = new Plan();
                p3.setNombrePlan("Mantenimiento Balanceado");
                p3.setTipoDieta("Mediterránea");
                p3.setDescripcion("Mantén tu peso ideal con una dieta equilibrada y deliciosa.");

                planRepository.saveAll(List.of(p1, p2, p3));
                System.out.println("Base de datos inicializada con planes de prueba.");
            }
        };
    }

    @Bean
    CommandLineRunner initComidas(com.backend.fitlife.persistence.repositories.ComidaRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                com.backend.fitlife.persistence.entities.Comida c1 = new com.backend.fitlife.persistence.entities.Comida();
                c1.setNombre("Pollo con Arroz");
                c1.setTipo("Almuerzo");
                c1.setCalorias(450.0f);
                c1.setProteinas(30.0f);
                c1.setGrasas(10.0f);
                c1.setCarbohidratos(50.0f);

                com.backend.fitlife.persistence.entities.Comida c2 = new com.backend.fitlife.persistence.entities.Comida();
                c2.setNombre("Avena con Frutas");
                c2.setTipo("Desayuno");
                c2.setCalorias(300.0f);
                c2.setProteinas(10.0f);
                c2.setGrasas(5.0f);
                c2.setCarbohidratos(55.0f);

                repository.saveAll(List.of(c1, c2));
                System.out.println("Base de datos inicializada con comidas de prueba.");
            }
        };
    }

    @Bean
    CommandLineRunner initRutinas(com.backend.fitlife.persistence.repositories.RutinaRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                com.backend.fitlife.persistence.entities.Rutina r1 = new com.backend.fitlife.persistence.entities.Rutina();
                r1.setNombreRutina("Full Body");
                r1.setNivel("Principiante");
                r1.setDuracion(45);
                r1.setDescripcion("Rutina de cuerpo completo para iniciarse.");

                com.backend.fitlife.persistence.entities.Rutina r2 = new com.backend.fitlife.persistence.entities.Rutina();
                r2.setNombreRutina("Split Torso/Pierna");
                r2.setNivel("Intermedio");
                r2.setDuracion(60);
                r2.setDescripcion("División de entrenamiento en dos días.");

                repository.saveAll(List.of(r1, r2));
                System.out.println("Base de datos inicializada con rutinas de prueba.");
            }
        };
    }

    @Bean
    CommandLineRunner initNutricionistas(
            com.backend.fitlife.persistence.repositories.NutricionistaRepository nutricionistaRepo,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        return args -> {
            Optional<com.backend.fitlife.persistence.entities.Nutricionista> existing = nutricionistaRepo.findByEmail("nutricionista@gmail.com");
            if (existing.isEmpty()) {
                com.backend.fitlife.persistence.entities.Nutricionista admin = new com.backend.fitlife.persistence.entities.Nutricionista();
                admin.setNombre("Nutricionista Principal");
                admin.setEmail("nutricionista@gmail.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                nutricionistaRepo.save(admin);
                System.out.println("Base de datos: Cuenta de Nutricionista CREADA (admin123).");
            } else {
                // Forzamos la contraseña por si acaso estaba mal en el SQL
                com.backend.fitlife.persistence.entities.Nutricionista admin = existing.get();
                admin.setPassword(passwordEncoder.encode("admin123"));
                nutricionistaRepo.save(admin);
                System.out.println("Base de datos: Cuenta de Nutricionista ACTUALIZADA (admin123).");
            }
        };
    }

    @Bean
    CommandLineRunner initUsuarios(com.backend.fitlife.persistence.repositories.UsuarioRepository repository, 
                                   org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        return args -> {
            Optional<com.backend.fitlife.persistence.entities.Usuario> existing = repository.findByEmail("fran@gmail.com");
            if (existing.isEmpty()) {
                com.backend.fitlife.persistence.entities.Usuario u2 = new com.backend.fitlife.persistence.entities.Usuario();
                u2.setNombre("Fran");
                u2.setEmail("fran@gmail.com");
                u2.setPassword(passwordEncoder.encode("admin123"));
                u2.setPro(true);
                repository.save(u2);
                System.out.println("Base de datos: Usuario Fran CREADO (admin123).");
            } else {
                com.backend.fitlife.persistence.entities.Usuario u2 = existing.get();
                u2.setPassword(passwordEncoder.encode("admin123"));
                repository.save(u2);
                System.out.println("Base de datos: Usuario Fran ACTUALIZADO (admin123).");
            }
        };
    }
}
