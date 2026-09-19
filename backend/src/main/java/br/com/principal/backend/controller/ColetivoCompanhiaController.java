
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

import br.com.principal.backend.entity.ColetivoCompanhia;
import br.com.principal.backend.service.ColetivoCompanhiaService;

@RestController
@RequestMapping("/coletivos-companhias")
public class ColetivoCompanhiaController {

    private final ColetivoCompanhiaService service;

    public ColetivoCompanhiaController(
            ColetivoCompanhiaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> criar(
            @RequestBody ColetivoCompanhia coletivo) {

        try {
            return ResponseEntity.ok(
                    service.salvar(coletivo)
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ColetivoCompanhia>>
    listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ColetivoCompanhia>
    buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @GetMapping("/nome")
    public ResponseEntity<List<ColetivoCompanhia>>
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

