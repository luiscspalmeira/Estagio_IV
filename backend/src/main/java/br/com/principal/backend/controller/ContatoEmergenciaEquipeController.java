
package br.com.principal.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.principal.backend.entity.ContatoEmergenciaEquipe;
import br.com.principal.backend.service.ContatoEmergenciaEquipeService;

@RestController
@RequestMapping("/contato-emergencia-equipe")
public class ContatoEmergenciaEquipeController {

    private final ContatoEmergenciaEquipeService service;

    public ContatoEmergenciaEquipeController(
            ContatoEmergenciaEquipeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> criar(
            @RequestBody ContatoEmergenciaEquipe contato) {

        try {

            return ResponseEntity.ok(
                    service.salvar(contato)
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ContatoEmergenciaEquipe>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContatoEmergenciaEquipe> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @GetMapping("/colaborador/{idColaborador}")
    public ResponseEntity<List<ContatoEmergenciaEquipe>>
    buscarPorColaborador(
            @PathVariable Long idColaborador) {

        return ResponseEntity.ok(
                service.buscarPorColaborador(idColaborador)
        );
    }

    @GetMapping(
            "/colaborador/{idColaborador}/ordem/{ordemContato}"
    )
    public ResponseEntity<ContatoEmergenciaEquipe>
    buscarPorColaboradorEOrdem(
            @PathVariable Long idColaborador,
            @PathVariable Short ordemContato) {

        return ResponseEntity.ok(
                service.buscarPorColaboradorEOrdem(
                        idColaborador,
                        ordemContato
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}

