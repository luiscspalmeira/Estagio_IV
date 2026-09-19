
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.AutorizacaoSaida;

public interface AutorizacaoSaidaRepository
        extends JpaRepository<AutorizacaoSaida, Long> {

    List<AutorizacaoSaida> findByIdAluno(Long idAluno);
}

