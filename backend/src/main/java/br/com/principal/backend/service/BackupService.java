
package br.com.principal.backend.service;

import java.io.IOException;

import org.springframework.stereotype.Service;

@Service
public class BackupService {

    public byte[] gerarBackup() throws IOException, InterruptedException {

        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker",
                "exec",
                "postgres_principal",
                "pg_dump",
                "-U",
                "postgres",
                "-d",
                "principal",
                "-Fc"
        );

        processBuilder.redirectErrorStream(true);

        Process processo = processBuilder.start();

        byte[] backup = processo.getInputStream().readAllBytes();

        int codigoSaida = processo.waitFor();

        if (codigoSaida != 0) {
            throw new IOException(
                    "Não foi possível gerar o backup do banco de dados."
            );
        }

        return backup;
    }
}

