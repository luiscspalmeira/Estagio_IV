
package br.com.principal.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.principal.backend.entity.ItemAcervoArtistico;

public interface ItemAcervoArtisticoRepository
        extends JpaRepository<ItemAcervoArtistico, Long> {

    List<ItemAcervoArtistico> findByCategoriaItem(
            String categoriaItem
    );

    List<ItemAcervoArtistico> findByNomePecaDescricaoContainingIgnoreCase(
            String nomePecaDescricao
    );
}

