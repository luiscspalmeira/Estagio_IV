
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

import br.com.principal.backend.entity.DocumentoFamiliar;
import br.com.principal.backend.entity.DocumentoFamiliarId;
import br.com.principal.backend.service.DocumentoFamiliarService;

@RestController
@RequestMapping("/documentos-familiares")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentoFamiliarController {

    private final DocumentoFamiliarService service;

    public DocumentoFamiliarController(
            DocumentoFamiliarService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody DocumentoFamiliar documentoFamiliar) {

        try {

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(service.salvar(documentoFamiliar));

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<DocumentoFamiliar>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/documento/{idDocumento}")
    public ResponseEntity<List<DocumentoFamiliar>>
    buscarPorDocumento(
            @PathVariable Long idDocumento) {

        return ResponseEntity.ok(
                service.buscarPorDocumento(idDocumento)
        );
    }

    @GetMapping("/familiar/{idFamiliar}")
    public ResponseEntity<List<DocumentoFamiliar>>
    buscarPorFamiliar(
            @PathVariable Long idFamiliar) {

        return ResponseEntity.ok(
                service.buscarPorFamiliar(idFamiliar)
        );
    }

    @GetMapping("/{idDocumento}/{idFamiliar}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long idDocumento,
            @PathVariable Long idFamiliar) {

        DocumentoFamiliarId id =
                new DocumentoFamiliarId(
                        idDocumento,
                        idFamiliar
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

    @DeleteMapping("/{idDocumento}/{idFamiliar}")
    public ResponseEntity<?> excluir(
            @PathVariable Long idDocumento,
            @PathVariable Long idFamiliar) {

        DocumentoFamiliarId id =
                new DocumentoFamiliarId(
                        idDocumento,
                        idFamiliar
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

