
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.CriterioBrasil;

public interface CriterioBrasilRepository
        extends JpaRepository<CriterioBrasil, Long> {

    List<CriterioBrasil> findByIdAluno(Long idAluno);

    List<CriterioBrasil> findByAnoSemestreReferencia(
            String anoSemestreReferencia
    );

    boolean existsByIdAlunoAndAnoSemestreReferencia(
            Long idAluno,
            String anoSemestreReferencia
    );
}

