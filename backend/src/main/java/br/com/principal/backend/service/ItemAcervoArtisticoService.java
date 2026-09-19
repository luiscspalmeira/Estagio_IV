
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.ItemAcervoArtistico;
import br.com.principal.backend.repository.ItemAcervoArtisticoRepository;

@Service
public class ItemAcervoArtisticoService {

    private final ItemAcervoArtisticoRepository repository;

    public ItemAcervoArtisticoService(
            ItemAcervoArtisticoRepository repository) {
        this.repository = repository;
    }

    public ItemAcervoArtistico salvar(
            ItemAcervoArtistico item) {

        if (item == null) {
            throw new IllegalArgumentException(
                    "O item do acervo não pode ser nulo."
            );
        }

        if (item.getCategoriaItem() == null ||
                item.getCategoriaItem().isBlank()) {
            throw new IllegalArgumentException(
                    "A categoria do item é obrigatória."
            );
        }

        if (item.getNomePecaDescricao() == null ||
                item.getNomePecaDescricao().isBlank()) {
            throw new IllegalArgumentException(
                    "O nome/descrição da peça é obrigatório."
            );
        }

        if (item.getQuantidadeTotal() == null) {
            throw new IllegalArgumentException(
                    "A quantidade total é obrigatória."
            );
        }

        if (item.getQuantidadeTotal() < 0) {
            throw new IllegalArgumentException(
                    "A quantidade total não pode ser negativa."
            );
        }

        if (item.getQuantidadeDisponivel() == null) {
            throw new IllegalArgumentException(
                    "A quantidade disponível é obrigatória."
            );
        }

        if (item.getQuantidadeDisponivel() < 0) {
            throw new IllegalArgumentException(
                    "A quantidade disponível não pode ser negativa."
            );
        }

        if (item.getQuantidadeDisponivel() >
                item.getQuantidadeTotal()) {
            throw new IllegalArgumentException(
                    "A quantidade disponível não pode ser maior que a quantidade total."
            );
        }

        return repository.save(item);
    }

    public List<ItemAcervoArtistico> listarTodos() {
        return repository.findAll();
    }

    public ItemAcervoArtistico buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Item do acervo não encontrado."
                ));
    }

    public List<ItemAcervoArtistico> buscarPorCategoria(
            String categoriaItem) {

        return repository.findByCategoriaItem(categoriaItem);
    }

    public List<ItemAcervoArtistico> buscarPorNome(
            String nomePecaDescricao) {

        return repository
                .findByNomePecaDescricaoContainingIgnoreCase(
                        nomePecaDescricao
                );
    }

    public void excluir(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Item do acervo não encontrado."
            );
        }

        repository.deleteById(id);
    }
}

