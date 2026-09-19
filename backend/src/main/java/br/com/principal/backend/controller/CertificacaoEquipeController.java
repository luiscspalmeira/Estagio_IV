
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

import br.com.principal.backend.entity.CertificacaoEquipe;
import br.com.principal.backend.service.CertificacaoEquipeService;

@RestController
@RequestMapping("/certificacao-equipe")
public class CertificacaoEquipeController {

    private final CertificacaoEquipeService service;

    public CertificacaoEquipeController(
            CertificacaoEquipeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> criar(
            @RequestBody CertificacaoEquipe certificacao) {

        try {
            return ResponseEntity.ok(
                    service.salvar(certificacao)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<CertificacaoEquipe>> listarTodos() {
        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CertificacaoEquipe> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @GetMapping("/colaborador/{idColaborador}")
    public ResponseEntity<List<CertificacaoEquipe>>
    buscarPorColaborador(
            @PathVariable Long idColaborador) {

        return ResponseEntity.ok(
                service.buscarPorColaborador(idColaborador)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}

