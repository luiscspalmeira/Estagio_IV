package br.com.principal.backend.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.SaudeEquipe;

public interface SaudeEquipeRepository
        extends JpaRepository<SaudeEquipe, Long> {

    List<SaudeEquipe> findByIdColaborador(Long idColaborador);

    Optional<SaudeEquipe> findByIdColaboradorAndAnoReferencia(
            Long idColaborador,
            Short anoReferencia
    );

    List<SaudeEquipe> findByAnoReferencia(Short anoReferencia);

    boolean existsByIdColaboradorAndAnoReferencia(
            Long idColaborador,
            Short anoReferencia
    );
}

