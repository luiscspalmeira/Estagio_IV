
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

import br.com.principal.backend.entity.SaudeBiometria;
import br.com.principal.backend.service.SaudeBiometriaService;

@RestController
@RequestMapping("/saude-biometria")
public class SaudeBiometriaController {

    private final SaudeBiometriaService service;

    public SaudeBiometriaController(
            SaudeBiometriaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(
            @RequestBody SaudeBiometria saude) {

        try {
            SaudeBiometria salvo = service.salvar(saude);
            return ResponseEntity.ok(salvo);

        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<SaudeBiometria>> listarTodos() {

        return ResponseEntity.ok(
                service.listarTodos());
    }

    @GetMapping("/aluno/{idAluno}")
    public ResponseEntity<List<SaudeBiometria>> listarPorAluno(
            @PathVariable Long idAluno) {

        return ResponseEntity.ok(
                service.listarPorAluno(idAluno));
    }

    @GetMapping("/semestre/{semestreAno}")
    public ResponseEntity<List<SaudeBiometria>> listarPorSemestre(
            @PathVariable String semestreAno) {

        return ResponseEntity.ok(
                service.listarPorSemestre(semestreAno));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaudeBiometria> buscarPorId(
            @PathVariable Long id) {

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
