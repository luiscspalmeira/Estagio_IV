
package br.com.principal.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.principal.backend.entity.Matricula;
import br.com.principal.backend.service.MatriculaService;

@RestController
@RequestMapping("/matriculas")
public class MatriculaController {

    private final MatriculaService service;

    public MatriculaController(MatriculaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(
            @RequestBody Matricula matricula) {

        try {

            Matricula salva = service.salvar(matricula);

            return ResponseEntity.ok(salva);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Matricula>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Matricula> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<Matricula>> listarPorAluno(
            @PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.listarPorAluno(idAluno)
        );
    }

    @GetMapping("/curso/{idCurso}")
    public ResponseEntity<List<Matricula>> listarPorCurso(
            @PathVariable Long idCurso) {

        return ResponseEntity.ok(
                service.listarPorCurso(idCurso)
        );
    }

    @GetMapping("/periodo/{anoSemestre}")
    public ResponseEntity<List<Matricula>> listarPorPeriodo(
            @PathVariable String anoSemestre) {

        return ResponseEntity.ok(
                service.listarPorPeriodo(anoSemestre)
        );
    }

    @GetMapping("/status/{statusMatricula}")
    public ResponseEntity<List<Matricula>> listarPorStatus(
            @PathVariable String statusMatricula) {

        return ResponseEntity.ok(
                service.listarPorStatus(statusMatricula)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}

