
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.EspetaculoColetivo;
import br.com.principal.backend.entity.EspetaculoColetivoId;

public interface EspetaculoColetivoRepository
        extends JpaRepository<EspetaculoColetivo, EspetaculoColetivoId> {

    List<EspetaculoColetivo> findByIdIdEspetaculo(Long idEspetaculo);

    List<EspetaculoColetivo> findByIdIdColetivo(Long idColetivo);
}

