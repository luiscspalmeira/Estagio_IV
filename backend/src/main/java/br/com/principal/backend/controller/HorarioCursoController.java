
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

import br.com.principal.backend.entity.HorarioCurso;
import br.com.principal.backend.service.HorarioCursoService;

@RestController
@RequestMapping("/horarios-cursos")
public class HorarioCursoController {

    private final HorarioCursoService service;

    public HorarioCursoController(HorarioCursoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(
            @RequestBody HorarioCurso horario) {

        try {

            HorarioCurso salvo = service.salvar(horario);

            return ResponseEntity.ok(salvo);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<HorarioCurso>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<HorarioCurso> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @GetMapping("/curso/{idCurso}")
    public ResponseEntity<List<HorarioCurso>> listarPorCurso(
            @PathVariable Long idCurso) {

        return ResponseEntity.ok(
                service.listarPorCurso(idCurso)
        );
    }

    @GetMapping("/sala/{idSala}")
    public ResponseEntity<List<HorarioCurso>> listarPorSala(
            @PathVariable Long idSala) {

        return ResponseEntity.ok(
                service.listarPorSala(idSala)
        );
    }

    @GetMapping("/dia/{diaSemana}")
    public ResponseEntity<List<HorarioCurso>> listarPorDia(
            @PathVariable Short diaSemana) {

        return ResponseEntity.ok(
                service.listarPorDia(diaSemana)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}

