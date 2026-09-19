package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.DocumentoEstudante;
import br.com.principal.backend.entity.DocumentoEstudanteId;

public interface DocumentoEstudanteRepository
        extends JpaRepository<DocumentoEstudante, DocumentoEstudanteId> {

    List<DocumentoEstudante> findByIdIdDocumento(Long idDocumento);

    List<DocumentoEstudante> findByIdIdAluno(Long idAluno);
}