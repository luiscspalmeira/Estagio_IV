
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

import br.com.principal.backend.entity.ResponsavelLegal;
import br.com.principal.backend.service.ResponsavelLegalService;

@RestController
@RequestMapping("/responsaveis-legais")
public class ResponsavelLegalController {

    private final ResponsavelLegalService service;

    public ResponsavelLegalController(
            ResponsavelLegalService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ResponsavelLegal> cadastrar(
            @RequestBody ResponsavelLegal responsavel) {

        ResponsavelLegal salvo =
                service.salvar(responsavel);

        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<ResponsavelLegal>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<ResponsavelLegal>> listarPorAluno(
            @PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.listarPorAluno(idAluno)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponsavelLegal> buscarPorId(
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

