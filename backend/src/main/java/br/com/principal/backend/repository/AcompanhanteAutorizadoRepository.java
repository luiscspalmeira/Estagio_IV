
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.AcompanhanteAutorizado;

public interface AcompanhanteAutorizadoRepository
        extends JpaRepository<AcompanhanteAutorizado, Long> {

    List<AcompanhanteAutorizado> findByIdAluno(Long idAluno);
}
