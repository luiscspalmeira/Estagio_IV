
package br.com.principal.backend.controller;

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

import br.com.principal.backend.entity.EspetaculoColetivo;
import br.com.principal.backend.service.EspetaculoColetivoService;

@RestController
@RequestMapping("/espetaculos-coletivos")
@CrossOrigin(origins = "http://localhost:5173")
public class EspetaculoColetivoController {

    private final EspetaculoColetivoService service;

    public EspetaculoColetivoController(
            EspetaculoColetivoService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody EspetaculoColetivo relacionamento) {

        try {

            EspetaculoColetivo salvo =
                    service.salvar(relacionamento);

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
    public ResponseEntity<List<EspetaculoColetivo>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{idEspetaculo}/{idColetivo}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long idEspetaculo,
            @PathVariable Long idColetivo) {

        Optional<EspetaculoColetivo> resultado =
                service.buscarPorId(
                        idEspetaculo,
                        idColetivo
                );

        if (resultado.isPresent()) {
            return ResponseEntity.ok(resultado.get());
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/espetaculo/{idEspetaculo}")
    public ResponseEntity<List<EspetaculoColetivo>>
    listarPorEspetaculo(
            @PathVariable Long idEspetaculo) {

        return ResponseEntity.ok(
                service.listarPorEspetaculo(idEspetaculo)
        );
    }

    @GetMapping("/coletivo/{idColetivo}")
    public ResponseEntity<List<EspetaculoColetivo>>
    listarPorColetivo(
            @PathVariable Long idColetivo) {

        return ResponseEntity.ok(
                service.listarPorColetivo(idColetivo)
        );
    }

    @DeleteMapping("/{idEspetaculo}/{idColetivo}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long idEspetaculo,
            @PathVariable Long idColetivo) {

        Optional<EspetaculoColetivo> existente =
                service.buscarPorId(
                        idEspetaculo,
                        idColetivo
                );

        if (existente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        service.excluir(idEspetaculo, idColetivo);

        return ResponseEntity.noContent().build();
    }
}

