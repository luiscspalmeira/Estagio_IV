
package br.com.principal.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.principal.backend.entity.AvaliacaoMultidisciplinar;
import br.com.principal.backend.service.AvaliacaoMultidisciplinarService;

@RestController
@RequestMapping("/avaliacoes-multidisciplinares")
public class AvaliacaoMultidisciplinarController {

    private final AvaliacaoMultidisciplinarService service;

    public AvaliacaoMultidisciplinarController(
            AvaliacaoMultidisciplinarService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AvaliacaoMultidisciplinar> cadastrar(
            @RequestBody AvaliacaoMultidisciplinar avaliacao) {

        AvaliacaoMultidisciplinar salva =
                service.salvar(avaliacao);

        return ResponseEntity.ok(salva);
    }

    @GetMapping
    public ResponseEntity<List<AvaliacaoMultidisciplinar>>
    listarTodos() {

        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<AvaliacaoMultidisciplinar>>
    listarPorAluno(@PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.listarPorAluno(idAluno));
    }

    @GetMapping("/colaborador/{idColaborador}")
    public ResponseEntity<List<AvaliacaoMultidisciplinar>>
    listarPorColaborador(
            @PathVariable Long idColaborador) {

        return ResponseEntity.ok(
                service.listarPorColaborador(idColaborador));
    }

    @GetMapping("/data/{dataAvaliacao}")
    public ResponseEntity<List<AvaliacaoMultidisciplinar>>
    listarPorData(
            @PathVariable LocalDate dataAvaliacao) {

        return ResponseEntity.ok(
                service.listarPorData(dataAvaliacao));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvaliacaoMultidisciplinar>
    buscarPorId(@PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}

