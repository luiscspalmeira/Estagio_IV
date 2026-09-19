
package br.com.principal.backend.controller;

import java.time.LocalDate;
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

import br.com.principal.backend.entity.Documento;
import br.com.principal.backend.service.DocumentoService;

@RestController
@RequestMapping("/documentos")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentoController {

    private final DocumentoService service;

    public DocumentoController(DocumentoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody Documento documento) {

        try {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(service.salvar(documento));

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Documento>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long id) {

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

    @GetMapping("/tipo/{tipoDocumento}")
    public ResponseEntity<List<Documento>> buscarPorTipo(
            @PathVariable String tipoDocumento) {

        return ResponseEntity.ok(
                service.buscarPorTipo(tipoDocumento)
        );
    }

    @GetMapping("/validade/{dataValidade}")
    public ResponseEntity<List<Documento>> buscarPorDataValidade(
            @PathVariable LocalDate dataValidade) {

        return ResponseEntity.ok(
                service.buscarPorDataValidade(dataValidade)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(
            @PathVariable Long id) {

        try {
            service.excluir(id);
            return ResponseEntity.noContent().build();

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}

