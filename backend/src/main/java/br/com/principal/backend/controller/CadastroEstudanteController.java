
package br.com.principal.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.principal.backend.entity.CadastroEstudante;
import br.com.principal.backend.service.CadastroEstudanteService;

@RestController
@RequestMapping("/estudantes")
public class CadastroEstudanteController {

    private final CadastroEstudanteService service;

    public CadastroEstudanteController(CadastroEstudanteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CadastroEstudante> cadastrar(
            @RequestBody CadastroEstudante estudante) {

        CadastroEstudante estudanteSalvo = service.salvar(estudante);

        return ResponseEntity.ok(estudanteSalvo);
    }

    @GetMapping
    public ResponseEntity<List<CadastroEstudante>> listarTodos() {

        List<CadastroEstudante> estudantes = service.listarTodos();

        return ResponseEntity.ok(estudantes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CadastroEstudante> buscarPorId(
            @PathVariable Long id) {

        CadastroEstudante estudante = service.buscarPorId(id);

        return ResponseEntity.ok(estudante);
    }
}

