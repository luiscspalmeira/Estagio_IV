package br.com.principal.backend.service;

import java.nio.file.Paths;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import br.com.principal.backend.entity.CadastroEstudante;
import br.com.principal.backend.entity.Documento;
import br.com.principal.backend.entity.DocumentoEstudante;
import br.com.principal.backend.entity.DocumentoEstudanteId;
import br.com.principal.backend.repository.CadastroEstudanteRepository;
import br.com.principal.backend.repository.DocumentoEstudanteRepository;
import br.com.principal.backend.repository.DocumentoRepository;

@Service
public class CadastroEstudanteService {

    private final CadastroEstudanteRepository repository;
    private final DocumentoRepository documentoRepository;
    private final DocumentoEstudanteRepository documentoEstudanteRepository;
    private final ArquivoUploadService arquivoUploadService;

    public CadastroEstudanteService(
            CadastroEstudanteRepository repository,
            DocumentoRepository documentoRepository,
            DocumentoEstudanteRepository documentoEstudanteRepository,
            ArquivoUploadService arquivoUploadService) {

        this.repository = repository;
        this.documentoRepository = documentoRepository;
        this.documentoEstudanteRepository = documentoEstudanteRepository;
        this.arquivoUploadService = arquivoUploadService;
    }

    public CadastroEstudante salvar(CadastroEstudante estudante) {
        return repository.save(estudante);
    }

    @Transactional
    public CadastroEstudante salvarComFoto(
            CadastroEstudante estudante,
            MultipartFile foto) {

        String caminhoFoto = null;

        try {
            // Primeiro, cadastra o estudante.
            CadastroEstudante estudanteSalvo =
                    repository.save(estudante);

            // A foto é opcional.
            if (foto == null || foto.isEmpty()) {
                return estudanteSalvo;
            }

            // Salva o arquivo no servidor.
            caminhoFoto = arquivoUploadService.salvar(foto);

            // Registra os metadados na tabela documento.
            Documento documento = new Documento();

            documento.setTipoDocumento("Foto do estudante");
            documento.setNomeArquivo(
                    obterNomeArquivo(foto.getOriginalFilename())
            );
            documento.setLinkArquivo(caminhoFoto);
            documento.setObservacao(
                    "Fotografia associada ao estudante "
                            + estudanteSalvo.getIdAluno()
            );

            Documento documentoSalvo =
                    documentoRepository.save(documento);

            // Associa o documento ao estudante.
            DocumentoEstudanteId id =
                    new DocumentoEstudanteId(
                            documentoSalvo.getIdDocumento(),
                            estudanteSalvo.getIdAluno()
                    );

            DocumentoEstudante associacao =
                    new DocumentoEstudante(id);

            documentoEstudanteRepository.save(associacao);

            return estudanteSalvo;

        } catch (RuntimeException erro) {

            // Se houver falha no banco, tenta apagar o arquivo salvo.
            if (caminhoFoto != null) {
                arquivoUploadService.excluir(caminhoFoto);
            }

            throw erro;
        }
    }

    private String obterNomeArquivo(String nomeOriginal) {

        if (nomeOriginal == null || nomeOriginal.isBlank()) {
            return "foto-estudante";
        }

        String nomeSeguro = nomeOriginal.replace("\\", "/");

        nomeSeguro = Paths.get(nomeSeguro)
                .getFileName()
                .toString();

        if (nomeSeguro.length() > 255) {
            nomeSeguro = nomeSeguro.substring(
                    nomeSeguro.length() - 255
            );
        }

        return nomeSeguro;
    }

    public List<CadastroEstudante> listarTodos() {
        return repository.findAll();
    }

    public CadastroEstudante buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Estudante não encontrado: " + id
                        )
                );
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}