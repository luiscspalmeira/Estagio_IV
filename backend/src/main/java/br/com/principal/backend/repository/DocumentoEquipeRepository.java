package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.DocumentoEquipe;
import br.com.principal.backend.entity.DocumentoEquipeId;

public interface DocumentoEquipeRepository
        extends JpaRepository<DocumentoEquipe, DocumentoEquipeId> {

    List<DocumentoEquipe> findByIdIdDocumento(Long idDocumento);

    List<DocumentoEquipe> findByIdIdColaborador(Long idColaborador);

}
