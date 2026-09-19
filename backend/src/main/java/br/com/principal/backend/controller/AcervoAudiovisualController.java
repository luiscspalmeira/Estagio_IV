
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

import br.com.principal.backend.entity.AcervoAudiovisual;
import br.com.principal.backend.service.AcervoAudiovisualService;

@RestController
@RequestMapping("/acervo-audiovisual")
@CrossOrigin(origins = "http://localhost:5173")
public class AcervoAudiovisualController {

    private final AcervoAudiovisualService service;

    public AcervoAudiovisualController(
            AcervoAudiovisualService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody AcervoAudiovisual acervo) {

        try {
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(service.salvar(acervo));

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<AcervoAudiovisual>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {

        try {
            return ResponseEntity.ok(service.buscarPorId(id));

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/espetaculo/{idEspetaculo}")
    public ResponseEntity<List<AcervoAudiovisual>>
    buscarPorEspetaculo(@PathVariable Long idEspetaculo) {

        return ResponseEntity.ok(
                service.buscarPorEspetaculo(idEspetaculo)
        );
    }

    @GetMapping("/data/{dataRegistro}")
    public ResponseEntity<List<AcervoAudiovisual>>
    buscarPorData(@PathVariable LocalDate dataRegistro) {

        return ResponseEntity.ok(
                service.buscarPorData(dataRegistro)
        );
    }

    @GetMapping("/tipo/{tipoMidiaCategoria}")
    public ResponseEntity<List<AcervoAudiovisual>>
    buscarPorTipo(@PathVariable String tipoMidiaCategoria) {

        return ResponseEntity.ok(
                service.buscarPorTipo(tipoMidiaCategoria)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {

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

