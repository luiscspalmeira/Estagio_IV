
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

import br.com.principal.backend.entity.AutorizacaoSaida;
import br.com.principal.backend.service.AutorizacaoSaidaService;

@RestController
@RequestMapping("/autorizacoes-saida")
public class AutorizacaoSaidaController {

    private final AutorizacaoSaidaService service;

    public AutorizacaoSaidaController(
            AutorizacaoSaidaService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AutorizacaoSaida> cadastrar(
            @RequestBody AutorizacaoSaida autorizacao) {

        AutorizacaoSaida salva =
                service.salvar(autorizacao);

        return ResponseEntity.ok(salva);
    }

    @GetMapping
    public ResponseEntity<List<AutorizacaoSaida>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos()
        );
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<AutorizacaoSaida>> listarPorAluno(
            @PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.listarPorAluno(idAluno)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AutorizacaoSaida> buscarPorId(
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

