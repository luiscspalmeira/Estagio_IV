
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.SaudeBiometria;
import br.com.principal.backend.repository.SaudeBiometriaRepository;

@Service
public class SaudeBiometriaService {

    private final SaudeBiometriaRepository repository;

    public SaudeBiometriaService(
            SaudeBiometriaRepository repository) {
        this.repository = repository;
    }

    public SaudeBiometria salvar(SaudeBiometria saude) {

        if (repository.existsByIdAlunoAndSemestreAno(
                saude.getIdAluno(),
                saude.getSemestreAno())) {

            throw new IllegalArgumentException(
                    "Já existe um registro de saúde para o aluno "
                            + saude.getIdAluno()
                            + " no semestre/ano "
                            + saude.getSemestreAno());
        }

        return repository.save(saude);
    }

    public List<SaudeBiometria> listarTodos() {
        return repository.findAll();
    }

    public List<SaudeBiometria> listarPorAluno(Long idAluno) {
        return repository.findByIdAluno(idAluno);
    }

    public List<SaudeBiometria> listarPorSemestre(
            String semestreAno) {

        return repository.findBySemestreAno(semestreAno);
    }

    public SaudeBiometria buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Registro de saúde não encontrado: "
                                + id));
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}
