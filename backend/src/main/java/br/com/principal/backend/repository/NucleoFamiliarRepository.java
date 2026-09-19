
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.NucleoFamiliar;

public interface NucleoFamiliarRepository
        extends JpaRepository<NucleoFamiliar, Long> {

    List<NucleoFamiliar> findByIdAluno(Long idAluno);
}

