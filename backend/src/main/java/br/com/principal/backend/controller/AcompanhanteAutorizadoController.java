
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

import br.com.principal.backend.entity.AcompanhanteAutorizado;
import br.com.principal.backend.service.AcompanhanteAutorizadoService;

@RestController
@RequestMapping("/acompanhantes-autorizados")
public class AcompanhanteAutorizadoController {

    private final AcompanhanteAutorizadoService service;

    public AcompanhanteAutorizadoController(
            AcompanhanteAutorizadoService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AcompanhanteAutorizado> cadastrar(
            @RequestBody AcompanhanteAutorizado acompanhante) {

        AcompanhanteAutorizado salvo =
                service.salvar(acompanhante);

        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<AcompanhanteAutorizado>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<AcompanhanteAutorizado>> listarPorAluno(
            @PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.listarPorAluno(idAluno)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcompanhanteAutorizado> buscarPorId(
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

