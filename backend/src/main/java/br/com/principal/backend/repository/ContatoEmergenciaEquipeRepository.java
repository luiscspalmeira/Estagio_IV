
package br.com.principal.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.ContatoEmergenciaEquipe;

public interface ContatoEmergenciaEquipeRepository
        extends JpaRepository<ContatoEmergenciaEquipe, Long> {

    List<ContatoEmergenciaEquipe> findByIdColaborador(
            Long idColaborador
    );

    Optional<ContatoEmergenciaEquipe> findByIdColaboradorAndOrdemContato(
            Long idColaborador,
            Short ordemContato
    );

    boolean existsByIdColaboradorAndOrdemContato(
            Long idColaborador,
            Short ordemContato
    );
}

