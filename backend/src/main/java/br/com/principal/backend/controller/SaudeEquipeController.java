
package br.com.principal.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.principal.backend.entity.SaudeEquipe;
import br.com.principal.backend.service.SaudeEquipeService;

@RestController
@RequestMapping("/saude-equipe")
public class SaudeEquipeController {

    private final SaudeEquipeService service;

    public SaudeEquipeController(
            SaudeEquipeService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody SaudeEquipe saudeEquipe) {

        try {

            SaudeEquipe salvo =
                    service.salvar(saudeEquipe);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(salvo);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<SaudeEquipe>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long id) {

        try {

            SaudeEquipe saudeEquipe =
                    service.buscarPorId(id);

            return ResponseEntity.ok(saudeEquipe);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/colaborador/{idColaborador}")
    public ResponseEntity<List<SaudeEquipe>>
    buscarPorColaborador(
            @PathVariable Long idColaborador) {

        return ResponseEntity.ok(
                service.buscarPorColaborador(
                        idColaborador
                )
        );
    }

    @GetMapping(
            "/colaborador/{idColaborador}/ano/{anoReferencia}"
    )
    public ResponseEntity<?> buscarPorColaboradorEAno(
            @PathVariable Long idColaborador,
            @PathVariable Short anoReferencia) {

        try {

            SaudeEquipe saudeEquipe =
                    service.buscarPorColaboradorEAno(
                            idColaborador,
                            anoReferencia
                    );

            return ResponseEntity.ok(saudeEquipe);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/ano/{anoReferencia}")
    public ResponseEntity<List<SaudeEquipe>>
    buscarPorAno(
            @PathVariable Short anoReferencia) {

        return ResponseEntity.ok(
                service.buscarPorAno(
                        anoReferencia
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(
            @PathVariable Long id) {

        try {

            service.excluir(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}

