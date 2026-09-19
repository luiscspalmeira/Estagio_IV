
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.Matricula;

public interface MatriculaRepository
        extends JpaRepository<Matricula, Long> {

    List<Matricula> findByIdAluno(Long idAluno);

    List<Matricula> findByIdCurso(Long idCurso);

    List<Matricula> findByAnoSemestre(String anoSemestre);

    List<Matricula> findByStatusMatricula(String statusMatricula);

    boolean existsByIdAlunoAndIdCursoAndAnoSemestre(
            Long idAluno,
            Long idCurso,
            String anoSemestre
    );
}

