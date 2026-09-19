
package br.com.principal.backend.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

import br.com.principal.backend.entity.Visita;
import br.com.principal.backend.service.VisitaService;

@RestController
@RequestMapping("/visitas")
@CrossOrigin(origins = "http://localhost:5173")
public class VisitaController {

    private final VisitaService service;

    public VisitaController(VisitaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody Visita visita) {

        try {

            Visita salva = service.salvar(visita);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(salva);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Visita>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long id) {

        Optional<Visita> visita =
                service.buscarPorId(id);

        if (visita.isPresent()) {
            return ResponseEntity.ok(visita.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/data/{data}")
    public ResponseEntity<List<Visita>> listarPorData(
            @PathVariable LocalDate data) {

        return ResponseEntity.ok(
                service.listarPorData(data)
        );
    }

    @GetMapping("/sala/{idSala}")
    public ResponseEntity<List<Visita>> listarPorSala(
            @PathVariable Long idSala) {

        return ResponseEntity.ok(
                service.listarPorSala(idSala)
        );
    }

    @GetMapping("/colaborador/{idColaborador}")
    public ResponseEntity<List<Visita>>
    listarPorColaborador(
            @PathVariable Long idColaborador) {

        return ResponseEntity.ok(
                service.listarPorColaborador(idColaborador)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        Optional<Visita> visita =
                service.buscarPorId(id);

        if (visita.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}

