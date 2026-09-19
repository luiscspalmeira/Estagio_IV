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

import br.com.principal.backend.entity.DocumentoResponsavel;
import br.com.principal.backend.entity.DocumentoResponsavelId;
import br.com.principal.backend.service.DocumentoResponsavelService;

@RestController
@RequestMapping("/documentos-responsaveis")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentoResponsavelController {

    private final DocumentoResponsavelService service;

    public DocumentoResponsavelController(
            DocumentoResponsavelService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody DocumentoResponsavel documentoResponsavel) {

        try {
            DocumentoResponsavel salvo = service.salvar(documentoResponsavel);

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
    public ResponseEntity<List<DocumentoResponsavel>> listarTodos() {

        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/documento/{idDocumento}")
    public ResponseEntity<List<DocumentoResponsavel>> buscarPorDocumento(
            @PathVariable Long idDocumento) {

        return ResponseEntity.ok(
                service.buscarPorDocumento(idDocumento));
    }

    @GetMapping("/responsavel/{idResponsavel}")
    public ResponseEntity<List<DocumentoResponsavel>> buscarPorResponsavel(
            @PathVariable Long idResponsavel) {

        return ResponseEntity.ok(
                service.buscarPorResponsavel(idResponsavel));
    }

    @GetMapping("/{idDocumento}/{idResponsavel}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long idDocumento,
            @PathVariable Long idResponsavel) {

        DocumentoResponsavelId id = new DocumentoResponsavelId(
                idDocumento,
                idResponsavel);

        return service.buscarPorId(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{idDocumento}/{idResponsavel}")
    public ResponseEntity<?> excluir(
            @PathVariable Long idDocumento,
            @PathVariable Long idResponsavel) {

        DocumentoResponsavelId id = new DocumentoResponsavelId(
                idDocumento,
                idResponsavel);

        if (service.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }

}
