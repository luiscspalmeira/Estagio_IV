
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

import br.com.principal.backend.entity.Curso;
import br.com.principal.backend.service.CursoService;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    private final CursoService service;

    public CursoController(CursoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(
            @RequestBody Curso curso) {

        try {

            Curso salvo = service.salvar(curso);

            return ResponseEntity.ok(salvo);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Curso>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @GetMapping("/status/{statusCurso}")
    public ResponseEntity<List<Curso>> listarPorStatus(
            @PathVariable String statusCurso) {

        return ResponseEntity.ok(
                service.listarPorStatus(statusCurso)
        );
    }

    @GetMapping("/modalidade/{modalidadeCurso}")
    public ResponseEntity<List<Curso>> listarPorModalidade(
            @PathVariable String modalidadeCurso) {

        return ResponseEntity.ok(
                service.listarPorModalidade(modalidadeCurso)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}

