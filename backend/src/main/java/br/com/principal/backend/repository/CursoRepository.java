
package br.com.principal.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.Curso;

public interface CursoRepository extends JpaRepository<Curso, Long> {

    Optional<Curso> findByNomeCurso(String nomeCurso);

    List<Curso> findByStatusCurso(String statusCurso);

    List<Curso> findByModalidadeCurso(String modalidadeCurso);

    boolean existsByNomeCurso(String nomeCurso);
}

