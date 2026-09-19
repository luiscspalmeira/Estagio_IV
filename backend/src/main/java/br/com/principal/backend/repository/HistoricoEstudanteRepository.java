package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.HistoricoEstudante;

public interface HistoricoEstudanteRepository extends JpaRepository<HistoricoEstudante, Long> {
    List<HistoricoEstudante> findByIdAluno(Long idAluno);
}