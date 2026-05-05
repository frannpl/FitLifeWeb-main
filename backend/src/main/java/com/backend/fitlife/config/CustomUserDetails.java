package com.backend.fitlife.config;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.backend.fitlife.persistence.entities.Usuario;
import com.backend.fitlife.persistence.entities.Nutricionista;

public class CustomUserDetails implements UserDetails {

    private String name;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Usuario usuario) {
        this.name = usuario.getEmail();
        this.password = usuario.getPassword();
        this.authorities = List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_USER"));
    }

    public CustomUserDetails(Nutricionista nutricionista) {
        this.name = nutricionista.getEmail();
        this.password = nutricionista.getPassword();
        this.authorities = List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_NUTRICIONISTA"));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
