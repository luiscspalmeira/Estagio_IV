
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.DocumentoFamiliar;
import br.com.principal.backend.entity.DocumentoFamiliarId;

public interface DocumentoFamiliarRepository
        extends JpaRepository<
                DocumentoFamiliar,
                DocumentoFamiliarId> {

    List<DocumentoFamiliar> findByIdIdDocumento(
            Long idDocumento);

    List<DocumentoFamiliar> findByIdIdFamiliar(
            Long idFamiliar);
}

