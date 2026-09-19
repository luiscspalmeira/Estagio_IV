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

import br.com.principal.backend.entity.Espetaculo;
import br.com.principal.backend.service.EspetaculoService;

@RestController
@RequestMapping("/espetaculos")
public class EspetaculoController {

    private final EspetaculoService service;

    public EspetaculoController(
            EspetaculoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> criar(
            @RequestBody Espetaculo espetaculo) {

        try {
            return ResponseEntity.ok(
                    service.salvar(espetaculo)
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Espetaculo>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Espetaculo> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @GetMapping("/nome")
    public ResponseEntity<List<Espetaculo>>
    buscarPorNome(
            @RequestParam String valor) {

        return ResponseEntity.ok(
                service.buscarPorNome(valor)
        );
    }

    @GetMapping("/ano/{ano}")
    public ResponseEntity<List<Espetaculo>>
    buscarPorAno(
            @PathVariable Short ano) {

        return ResponseEntity.ok(
                service.buscarPorAno(ano)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}