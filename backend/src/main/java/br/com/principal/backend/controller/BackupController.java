package br.com.principal.backend.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.principal.backend.service.BackupService;
import br.com.principal.backend.service.RestoreService;

@RestController
@RequestMapping("/backup")
@CrossOrigin(origins = "http://localhost:5173")
public class BackupController {

    private final BackupService backupService;
    private final RestoreService restoreService;

    public BackupController(
            BackupService backupService,
            RestoreService restoreService) {

        this.backupService = backupService;
        this.restoreService = restoreService;
    }

    @GetMapping
    public ResponseEntity<?> gerarBackup() {

        try {

            byte[] backup = backupService.gerarBackup();

            String dataHora = LocalDateTime.now()
                    .format(
                            DateTimeFormatter.ofPattern(
                                    "yyyy-MM-dd_HH-mm-ss"
                            )
                    );

            String nomeArquivo =
                    "backup_principal_" + dataHora + ".dump";

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" +
                                    nomeArquivo +
                                    "\""
                    )
                    .contentType(
                            MediaType.APPLICATION_OCTET_STREAM
                    )
                    .contentLength(backup.length)
                    .body(backup);

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Erro ao gerar backup: " +
                                    e.getMessage()
                    );
        }
    }

    @PostMapping(
            value = "/restore",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> restaurarBackup(
            @RequestParam("arquivo") MultipartFile arquivo) {

        try {

            restoreService.restaurarBackup(arquivo);

            return ResponseEntity.ok(
                    "Banco de dados restaurado com sucesso."
            );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Erro ao restaurar o banco de dados: " +
                                    e.getMessage()
                    );
        }
    }
}