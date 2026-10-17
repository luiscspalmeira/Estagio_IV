package br.com.principal.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ArquivoUploadService {

    private static final long TAMANHO_MAXIMO =
            5L * 1024 * 1024;

    private final Path diretorioFotos;

    public ArquivoUploadService(
            @Value("${app.upload.dir:uploads}") String diretorio) {

        this.diretorioFotos = Paths.get(diretorio)
                .toAbsolutePath()
                .normalize()
                .resolve("fotos-estudantes");
    }

    public String salvar(MultipartFile foto) {

        if (foto == null || foto.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Selecione uma foto."
            );
        }

        if (foto.getSize() > TAMANHO_MAXIMO) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "A foto não pode ultrapassar 5 MB."
            );
        }

        String extensao = identificarExtensao(foto);

        String nomeArquivo =
                UUID.randomUUID() + "." + extensao;

        Path destino = diretorioFotos
                .resolve(nomeArquivo)
                .normalize();

        if (!destino.startsWith(diretorioFotos)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Nome de arquivo inválido."
            );
        }

        try {
            Files.createDirectories(diretorioFotos);

            try (InputStream entrada = foto.getInputStream()) {
                Files.copy(
                        entrada,
                        destino,
                        StandardCopyOption.REPLACE_EXISTING
                );
            }

            return "/uploads/fotos-estudantes/" + nomeArquivo;

        } catch (IOException erro) {

            try {
                Files.deleteIfExists(destino);
            } catch (IOException ignored) {
                // Preserva a falha original.
            }

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Não foi possível salvar a foto."
            );
        }
    }

    private String identificarExtensao(MultipartFile foto) {

        byte[] assinatura = new byte[12];

        try (InputStream entrada = foto.getInputStream()) {

            int quantidade = entrada.read(assinatura);

            // JPEG: FF D8 FF
            if (quantidade >= 3
                    && (assinatura[0] & 0xFF) == 0xFF
                    && (assinatura[1] & 0xFF) == 0xD8
                    && (assinatura[2] & 0xFF) == 0xFF) {

                return "jpg";
            }

            // PNG: assinatura de 8 bytes.
            if (quantidade >= 8
                    && (assinatura[0] & 0xFF) == 0x89
                    && assinatura[1] == 0x50
                    && assinatura[2] == 0x4E
                    && assinatura[3] == 0x47
                    && assinatura[4] == 0x0D
                    && assinatura[5] == 0x0A
                    && assinatura[6] == 0x1A
                    && assinatura[7] == 0x0A) {

                return "png";
            }

            // WebP: começa com RIFF e contém WEBP nos bytes 8 a 11.
            if (quantidade >= 12
                    && assinatura[0] == 'R'
                    && assinatura[1] == 'I'
                    && assinatura[2] == 'F'
                    && assinatura[3] == 'F'
                    && assinatura[8] == 'W'
                    && assinatura[9] == 'E'
                    && assinatura[10] == 'B'
                    && assinatura[11] == 'P') {

                return "webp";
            }

        } catch (IOException erro) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Não foi possível ler a imagem."
            );
        }

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Formato inválido. Utilize JPG, JPEG, PNG ou WebP."
        );
    }

    public void excluir(String caminho) {

        if (caminho == null
                || !caminho.startsWith(
                        "/uploads/fotos-estudantes/")) {
            return;
        }

        String nomeArquivo = caminho.substring(
                "/uploads/fotos-estudantes/".length()
        );

        // Aceita apenas o nome do arquivo, nunca um caminho externo.
        if (nomeArquivo.contains("/")
                || nomeArquivo.contains("\\")
                || nomeArquivo.isBlank()) {
            return;
        }

        try {
            Files.deleteIfExists(
                    diretorioFotos.resolve(nomeArquivo).normalize()
            );
        } catch (IOException ignored) {
            // O erro de limpeza não deve ocultar a falha original.
        }
    }
}