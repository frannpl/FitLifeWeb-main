package com.backend.fitlife.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.fitlife.persistence.entities.Usuario;
import com.backend.fitlife.persistence.entities.Nutricionista;
import com.backend.fitlife.persistence.repositories.UsuarioRepository;
import com.backend.fitlife.persistence.repositories.NutricionistaRepository;
import com.backend.fitlife.config.CustomUserDetails;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private NutricionistaRepository nutricionistaRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> usuario = repository.findByEmail(username);
        if (usuario.isPresent()) {
            return new CustomUserDetails(usuario.get());
        }

        Optional<Nutricionista> nutricionista = nutricionistaRepository.findByEmail(username);
        if (nutricionista.isPresent()) {
            return new CustomUserDetails(nutricionista.get());
        }

        throw new UsernameNotFoundException("Usuario no encontrado " + username);
    }
}
