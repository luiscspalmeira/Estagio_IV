
package br.com.principal.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.ColetivoCompanhia;

public interface ColetivoCompanhiaRepository
        extends JpaRepository<ColetivoCompanhia, Long> {

    Optional<ColetivoCompanhia>
    findByNomeDoGrupoCompanhia(
            String nomeDoGrupoCompanhia
    );

    List<ColetivoCompanhia>
    findByNomeDoGrupoCompanhiaContainingIgnoreCase(
            String nomeDoGrupoCompanhia
    );
}