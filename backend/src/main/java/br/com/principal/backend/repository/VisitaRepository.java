
package br.com.principal.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.Visita;

public interface VisitaRepository
        extends JpaRepository<Visita, Long> {

    List<Visita> findByDataVisita(LocalDate dataVisita);

    List<Visita> findByIdSala(Long idSala);

    List<Visita> findByIdColaboradorResponsavelRecepcao(
            Long idColaboradorResponsavelRecepcao);
}

