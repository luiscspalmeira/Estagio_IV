package br.com.principal.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class RestoreService {

    public void restaurarBackup(MultipartFile arquivo)
            throws IOException, InterruptedException {

        if (arquivo == null || arquivo.isEmpty()) {
            throw new IllegalArgumentException(
                    "O arquivo de backup não foi selecionado."
            );
        }

        String nomeArquivo = arquivo.getOriginalFilename();

        if (nomeArquivo == null ||
                !nomeArquivo.toLowerCase().endsWith(".dump")) {

            throw new IllegalArgumentException(
                    "Selecione um arquivo com extensão .dump."
            );
        }

        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker",
                "exec",
                "-i",
                "postgres_principal",
                "pg_restore",
                "-U",
                "postgres",
                "-d",
                "principal",
                "--clean",
                "--if-exists",
                "--no-owner",
                "--no-acl",
                "--exit-on-error"
        );

        Process processo = processBuilder.start();

        try (
                InputStream entrada = arquivo.getInputStream();
                OutputStream saida = processo.getOutputStream()
        ) {

            entrada.transferTo(saida);
        }

        String erro = new String(
                processo.getErrorStream().readAllBytes()
        );

        int codigoSaida = processo.waitFor();

        if (codigoSaida != 0) {

            throw new IOException(
                    "Erro ao restaurar o banco de dados: " + erro
            );
        }
    }
}