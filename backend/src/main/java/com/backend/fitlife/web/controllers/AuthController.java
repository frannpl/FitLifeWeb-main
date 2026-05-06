package com.backend.fitlife.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.fitlife.config.JwtUtil;
import com.backend.fitlife.persistence.entities.Usuario;
import com.backend.fitlife.persistence.entities.Nutricionista;
import com.backend.fitlife.persistence.repositories.UsuarioRepository;
import com.backend.fitlife.persistence.repositories.NutricionistaRepository;
import com.backend.fitlife.services.dto.UsuarioDTO;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private NutricionistaRepository nutricionistaRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public String addNewUser(@RequestBody Usuario usuario) {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        repository.save(usuario);
        return "Usuario registrado correctamente";
    }

    @PostMapping("/registerNutricionista")
    public String addNewNutricionista(@RequestBody Nutricionista nutricionista) {
        nutricionista.setPassword(passwordEncoder.encode(nutricionista.getPassword()));
        nutricionistaRepository.save(nutricionista);
        return "Nutricionista registrado correctamente";
    }

    @PostMapping("/token")
    public ResponseEntity<String> getToken(@RequestBody com.backend.fitlife.services.dto.LoginRequest loginRequest) {
        try {
            System.out.println("Intento de login para: " + loginRequest.getEmail());
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            if (authenticate.isAuthenticated()) {
                return ResponseEntity.ok(jwtUtil.generateToken(loginRequest.getEmail()));
            } else {
                return ResponseEntity.status(401).body("Autenticación fallida");
            }
        } catch (org.springframework.security.authentication.BadCredentialsException e) {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }
}
