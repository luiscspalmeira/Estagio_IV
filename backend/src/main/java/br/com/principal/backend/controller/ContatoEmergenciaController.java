
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

import br.com.principal.backend.entity.ContatoEmergencia;
import br.com.principal.backend.service.ContatoEmergenciaService;

@RestController
@RequestMapping("/contatos-emergencia")
public class ContatoEmergenciaController {

    private final ContatoEmergenciaService service;

    public ContatoEmergenciaController(
            ContatoEmergenciaService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ContatoEmergencia> cadastrar(
            @RequestBody ContatoEmergencia contato) {

        ContatoEmergencia salvo =
                service.salvar(contato);

        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<ContatoEmergencia>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<ContatoEmergencia>> listarPorAluno(
            @PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.listarPorAluno(idAluno)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContatoEmergencia> buscarPorId(
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

