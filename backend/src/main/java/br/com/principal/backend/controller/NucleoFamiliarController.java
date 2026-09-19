
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

import br.com.principal.backend.entity.NucleoFamiliar;
import br.com.principal.backend.service.NucleoFamiliarService;

@RestController
@RequestMapping("/nucleo-familiar")
public class NucleoFamiliarController {

    private final NucleoFamiliarService service;

    public NucleoFamiliarController(
            NucleoFamiliarService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<NucleoFamiliar> cadastrar(
            @RequestBody NucleoFamiliar familiar) {

        NucleoFamiliar salvo = service.salvar(familiar);

        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public ResponseEntity<List<NucleoFamiliar>> listarTodos() {
        return ResponseEntity.ok(service.listarTodos());
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<NucleoFamiliar>> listarPorAluno(
            @PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.listarPorAluno(idAluno)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<NucleoFamiliar> buscarPorId(
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

