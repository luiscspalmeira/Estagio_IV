
package br.com.principal.backend.service;

import br.com.principal.backend.entity.AcervoAudiovisual;
import br.com.principal.backend.repository.AcervoAudiovisualRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AcervoAudiovisualService {

    private final AcervoAudiovisualRepository repository;

    public AcervoAudiovisualService(AcervoAudiovisualRepository repository) {
        this.repository = repository;
    }

    public AcervoAudiovisual salvar(AcervoAudiovisual acervo) {

        if (acervo.getIdEspetaculo() == null) {
            throw new IllegalArgumentException(
                    "O campo idEspetaculo é obrigatório."
            );
        }

        if (acervo.getDataRegistro() == null) {
            throw new IllegalArgumentException(
                    "O campo dataRegistro é obrigatório."
            );
        }

        if (acervo.getTipoMidiaCategoria() == null
                || acervo.getTipoMidiaCategoria().isBlank()) {
            throw new IllegalArgumentException(
                    "O campo tipoMidiaCategoria é obrigatório."
            );
        }

        try {
            return repository.save(acervo);

        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException(
                    "Não foi possível cadastrar o acervo audiovisual. "
                    + "Verifique se o idEspetaculo informado existe."
            );
        }
    }

    public List<AcervoAudiovisual> listarTodos() {
        return repository.findAll();
    }

    public AcervoAudiovisual buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Acervo audiovisual não encontrado."
                        )
                );
    }

    public List<AcervoAudiovisual> buscarPorEspetaculo(Long idEspetaculo) {
        return repository.findByIdEspetaculo(idEspetaculo);
    }

    public List<AcervoAudiovisual> buscarPorData(LocalDate dataRegistro) {
        return repository.findByDataRegistro(dataRegistro);
    }

    public List<AcervoAudiovisual> buscarPorTipo(String tipoMidiaCategoria) {
        return repository.findByTipoMidiaCategoria(tipoMidiaCategoria);
    }

    public void excluir(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException(
                    "Acervo audiovisual não encontrado."
            );
        }

        repository.deleteById(id);
    }
}

