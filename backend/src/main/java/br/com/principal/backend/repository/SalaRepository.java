
package br.com.principal.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.Sala;

public interface SalaRepository extends JpaRepository<Sala, Long> {

    Optional<Sala> findByNomeDaOficinaEstilo(String nomeDaOficinaEstilo);

    List<Sala> findByEstadoConservacao(String estadoConservacao);

    boolean existsByNomeDaOficinaEstilo(String nomeDaOficinaEstilo);
}

