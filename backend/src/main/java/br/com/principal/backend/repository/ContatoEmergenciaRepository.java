
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.ContatoEmergencia;

public interface ContatoEmergenciaRepository
        extends JpaRepository<ContatoEmergencia, Long> {

    List<ContatoEmergencia> findByIdAlunoOrderByOrdemContatoAsc(
            Long idAluno
    );
}

