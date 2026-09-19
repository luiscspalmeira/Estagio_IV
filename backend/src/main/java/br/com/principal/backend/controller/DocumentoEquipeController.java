package br.com.principal.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.principal.backend.entity.DocumentoEquipe;
import br.com.principal.backend.entity.DocumentoEquipeId;
import br.com.principal.backend.service.DocumentoEquipeService;

@RestController
@RequestMapping("/documentos-equipe")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentoEquipeController {

    private final DocumentoEquipeService service;

    public DocumentoEquipeController(
            DocumentoEquipeService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody DocumentoEquipe documentoEquipe) {

        try {
            DocumentoEquipe salvo = service.salvar(documentoEquipe);

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
    public ResponseEntity<List<DocumentoEquipe>> listarTodos() {

        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/documento/{idDocumento}")
    public ResponseEntity<List<DocumentoEquipe>> buscarPorDocumento(
            @PathVariable Long idDocumento) {

        return ResponseEntity.ok(
                service.buscarPorDocumento(idDocumento));
    }

    @GetMapping("/colaborador/{idColaborador}")
    public ResponseEntity<List<DocumentoEquipe>> buscarPorColaborador(
            @PathVariable Long idColaborador) {

        return ResponseEntity.ok(
                service.buscarPorColaborador(idColaborador));
    }

    @GetMapping("/{idDocumento}/{idColaborador}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long idDocumento,
            @PathVariable Long idColaborador) {

        DocumentoEquipeId id = new DocumentoEquipeId(
                idDocumento,
                idColaborador);

        return service.buscarPorId(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{idDocumento}/{idColaborador}")
    public ResponseEntity<?> excluir(
            @PathVariable Long idDocumento,
            @PathVariable Long idColaborador) {

        DocumentoEquipeId id = new DocumentoEquipeId(
                idDocumento,
                idColaborador);

        if (service.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }

}
