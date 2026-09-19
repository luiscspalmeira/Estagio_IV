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

import br.com.principal.backend.entity.DocumentoEstudante;
import br.com.principal.backend.entity.DocumentoEstudanteId;
import br.com.principal.backend.service.DocumentoEstudanteService;

@RestController
@RequestMapping("/documentos-estudantes")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentoEstudanteController {

    private final DocumentoEstudanteService service;

    public DocumentoEstudanteController(
            DocumentoEstudanteService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody DocumentoEstudante documentoEstudante) {

        try {

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(service.salvar(documentoEstudante));

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<DocumentoEstudante>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/documento/{idDocumento}")
    public ResponseEntity<List<DocumentoEstudante>> buscarPorDocumento(
            @PathVariable Long idDocumento) {

        return ResponseEntity.ok(
                service.buscarPorDocumento(idDocumento)
        );
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<DocumentoEstudante>> buscarPorAluno(
            @PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.buscarPorAluno(idAluno)
        );
    }

    @GetMapping("/{idDocumento}/{idAluno}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long idDocumento,
            @PathVariable Long idAluno) {

        DocumentoEstudanteId id =
                new DocumentoEstudanteId(
                        idDocumento,
                        idAluno
                );

        try {

            return ResponseEntity.ok(
                    service.buscarPorId(id)
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{idDocumento}/{idAluno}")
    public ResponseEntity<?> excluir(
            @PathVariable Long idDocumento,
            @PathVariable Long idAluno) {

        DocumentoEstudanteId id =
                new DocumentoEstudanteId(
                        idDocumento,
                        idAluno
                );

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