
package br.com.principal.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.AcervoAudiovisual;

public interface AcervoAudiovisualRepository
        extends JpaRepository<AcervoAudiovisual, Long> {

    List<AcervoAudiovisual> findByIdEspetaculo(Long idEspetaculo);

    List<AcervoAudiovisual> findByDataRegistro(LocalDate dataRegistro);

    List<AcervoAudiovisual> findByTipoMidiaCategoria(String tipoMidiaCategoria);
}

