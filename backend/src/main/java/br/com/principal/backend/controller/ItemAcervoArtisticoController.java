
package br.com.principal.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.principal.backend.entity.ItemAcervoArtistico;
import br.com.principal.backend.service.ItemAcervoArtisticoService;

@RestController
@RequestMapping("/item-acervo-artistico")
public class ItemAcervoArtisticoController {

    private final ItemAcervoArtisticoService service;

    public ItemAcervoArtisticoController(
            ItemAcervoArtisticoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> criar(
            @RequestBody ItemAcervoArtistico item) {

        try {
            return ResponseEntity.ok(
                    service.salvar(item)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ItemAcervoArtistico>> listarTodos() {
        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemAcervoArtistico> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @GetMapping("/categoria/{categoriaItem}")
    public ResponseEntity<List<ItemAcervoArtistico>>
    buscarPorCategoria(
            @PathVariable String categoriaItem) {

        return ResponseEntity.ok(
                service.buscarPorCategoria(categoriaItem)
        );
    }

    @GetMapping("/nome")
    public ResponseEntity<List<ItemAcervoArtistico>>
    buscarPorNome(
            @RequestParam String valor) {

        return ResponseEntity.ok(
                service.buscarPorNome(valor)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}

