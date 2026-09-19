
package br.com.principal.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.AvaliacaoMultidisciplinar;

public interface AvaliacaoMultidisciplinarRepository
        extends JpaRepository<AvaliacaoMultidisciplinar, Long> {

    List<AvaliacaoMultidisciplinar> findByIdAluno(Long idAluno);

    List<AvaliacaoMultidisciplinar> findByIdColaborador(
            Long idColaborador);

    List<AvaliacaoMultidisciplinar> findByDataAvaliacao(
            LocalDate dataAvaliacao);
}

