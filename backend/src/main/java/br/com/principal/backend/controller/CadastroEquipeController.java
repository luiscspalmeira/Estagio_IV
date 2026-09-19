
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

import br.com.principal.backend.entity.CadastroEquipe;
import br.com.principal.backend.service.CadastroEquipeService;

@RestController
@RequestMapping("/equipe")
public class CadastroEquipeController {

    private final CadastroEquipeService service;

    public CadastroEquipeController(
            CadastroEquipeService service
    ) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> salvar(
            @RequestBody CadastroEquipe equipe
    ) {

        try {

            CadastroEquipe salvo = service.salvar(equipe);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(salvo);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<CadastroEquipe>> listarTodos() {

        List<CadastroEquipe> equipes =
                service.listarTodos();

        return ResponseEntity.ok(equipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(
            @PathVariable Long id
    ) {

        try {

            CadastroEquipe equipe =
                    service.buscarPorId(id);

            return ResponseEntity.ok(equipe);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<CadastroEquipe>> buscarPorNome(
            @PathVariable String nome
    ) {

        List<CadastroEquipe> equipes =
                service.buscarPorNome(nome);

        return ResponseEntity.ok(equipes);
    }

    @GetMapping("/funcao/{funcao}")
    public ResponseEntity<List<CadastroEquipe>> buscarPorFuncao(
            @PathVariable String funcao
    ) {

        List<CadastroEquipe> equipes =
                service.buscarPorFuncao(funcao);

        return ResponseEntity.ok(equipes);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> buscarPorStatus(
            @PathVariable String status
    ) {

        try {

            List<CadastroEquipe> equipes =
                    service.buscarPorStatus(status);

            return ResponseEntity.ok(equipes);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(
            @PathVariable Long id
    ) {

        try {

            service.excluir(id);

            return ResponseEntity.noContent().build();

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}

