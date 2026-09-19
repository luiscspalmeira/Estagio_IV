
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.ResponsavelLegal;

public interface ResponsavelLegalRepository
        extends JpaRepository<ResponsavelLegal, Long> {

    List<ResponsavelLegal> findByIdAluno(Long idAluno);
}

