package br.com.principal.backend.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ArquivoUploadConfig implements WebMvcConfigurer {

    private final String diretorio;

    public ArquivoUploadConfig(
            @Value("${app.upload.dir:uploads}") String diretorio) {
        this.diretorio = diretorio;
    }

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry) {

        Path caminho = Paths.get(diretorio)
                .toAbsolutePath()
                .normalize();

        String local = caminho.toUri().toString();

        if (!local.endsWith("/")) {
            local += "/";
        }

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(local);
    }
}