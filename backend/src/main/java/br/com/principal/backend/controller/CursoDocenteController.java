
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

import br.com.principal.backend.entity.CursoDocente;
import br.com.principal.backend.entity.CursoDocenteId;
import br.com.principal.backend.service.CursoDocenteService;

@RestController
@RequestMapping("/curso-docente")
public class CursoDocenteController {

    private final CursoDocenteService service;

    public CursoDocenteController(CursoDocenteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody CursoDocente cursoDocente) {

        try {

            CursoDocente salvo = service.salvar(cursoDocente);

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
    public ResponseEntity<List<CursoDocente>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/curso/{idCurso}")
    public ResponseEntity<List<CursoDocente>> buscarPorCurso(
            @PathVariable Long idCurso) {

        return ResponseEntity.ok(
                service.buscarPorCurso(idCurso)
        );
    }

    @GetMapping("/colaborador/{idColaborador}")
    public ResponseEntity<List<CursoDocente>> buscarPorColaborador(
            @PathVariable Long idColaborador) {

        return ResponseEntity.ok(
                service.buscarPorColaborador(idColaborador)
        );
    }

    @GetMapping("/{idCurso}/{idColaborador}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long idCurso,
            @PathVariable Long idColaborador) {

        try {

            CursoDocenteId id =
                    new CursoDocenteId(idCurso, idColaborador);

            CursoDocente cursoDocente =
                    service.buscarPorId(id);

            return ResponseEntity.ok(cursoDocente);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{idCurso}/{idColaborador}")
    public ResponseEntity<?> excluir(
            @PathVariable Long idCurso,
            @PathVariable Long idColaborador) {

        try {

            CursoDocenteId id =
                    new CursoDocenteId(idCurso, idColaborador);

            service.excluir(id);

            return ResponseEntity.noContent().build();

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}

