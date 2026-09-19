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

import br.com.principal.backend.entity.CriterioBrasil;
import br.com.principal.backend.service.CriterioBrasilService;

@RestController
@RequestMapping("/criterio-brasil")
public class CriterioBrasilController {

    private final CriterioBrasilService service;

    public CriterioBrasilController(CriterioBrasilService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CriterioBrasil> cadastrar(
            @RequestBody CriterioBrasil criterio
    ) {
        CriterioBrasil salvo = service.salvar(criterio);

        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<CriterioBrasil>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<CriterioBrasil>> listarPorAluno(
            @PathVariable Long idAluno
    ) {
        return ResponseEntity.ok(
                service.listarPorAluno(idAluno)
        );
    }

    @GetMapping("/periodo/{anoSemestreReferencia}")
    public ResponseEntity<List<CriterioBrasil>> listarPorPeriodo(
            @PathVariable String anoSemestreReferencia
    ) {
        return ResponseEntity.ok(
                service.listarPorPeriodo(anoSemestreReferencia)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CriterioBrasil> buscarPorId(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id
    ) {
        service.excluir(id);

        return ResponseEntity.noContent().build();
    }
}