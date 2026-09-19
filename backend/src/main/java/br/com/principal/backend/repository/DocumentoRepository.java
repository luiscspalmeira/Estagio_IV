
package br.com.principal.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.Documento;

public interface DocumentoRepository
        extends JpaRepository<Documento, Long> {

    List<Documento> findByTipoDocumento(String tipoDocumento);

    List<Documento> findByDataValidade(LocalDate dataValidade);
}

