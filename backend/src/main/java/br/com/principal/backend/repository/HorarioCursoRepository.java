
package br.com.principal.backend.repository;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.HorarioCurso;

public interface HorarioCursoRepository
        extends JpaRepository<HorarioCurso, Long> {

    List<HorarioCurso> findByIdCurso(Long idCurso);

    List<HorarioCurso> findByIdSala(Long idSala);

    List<HorarioCurso> findByDiaSemana(Short diaSemana);

    boolean existsByIdCursoAndDiaSemanaAndHoraInicioAndHoraFim(
            Long idCurso,
            Short diaSemana,
            LocalTime horaInicio,
            LocalTime horaFim
    );
}

