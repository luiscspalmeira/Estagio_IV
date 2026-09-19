
package br.com.principal.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.principal.backend.entity.HistoricoEstudante;
import br.com.principal.backend.service.HistoricoEstudanteService;

@RestController
@RequestMapping("/historico-estudante")
public class HistoricoEstudanteController {

    private final HistoricoEstudanteService service;

    public HistoricoEstudanteController(
            HistoricoEstudanteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<HistoricoEstudante> cadastrar(
            @RequestBody HistoricoEstudante historico) {

        HistoricoEstudante salvo = service.salvar(historico);

        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<HistoricoEstudante>> listarTodos() {

        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<HistoricoEstudante>> listarPorAluno(
            @PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.listarPorAluno(idAluno)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoricoEstudante> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}

