
package br.com.principal.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.principal.backend.entity.Sala;
import br.com.principal.backend.repository.SalaRepository;

@Service
public class SalaService {

    private final SalaRepository repository;

    public SalaService(SalaRepository repository) {
        this.repository = repository;
    }

    public Sala salvar(Sala sala) {

        if (sala.getNomeDaOficinaEstilo() == null ||
                sala.getNomeDaOficinaEstilo().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "O nome da oficina/estilo é obrigatório."
            );
        }

        if (sala.getCapacidadeMaximaAlunos() == null ||
                sala.getCapacidadeMaximaAlunos() <= 0) {

            throw new IllegalArgumentException(
                    "A capacidade máxima de alunos deve ser maior que zero."
            );
        }

        if (sala.getCapacidadeSaidaEmergencia() != null &&
                sala.getCapacidadeSaidaEmergencia() <= 0) {

            throw new IllegalArgumentException(
                    "A capacidade da saída de emergência deve ser maior que zero."
            );
        }

        if (sala.getManutencaoProximaData() != null &&
                sala.getManutencaoUltimaData() != null &&
                sala.getManutencaoProximaData()
                        .isBefore(sala.getManutencaoUltimaData())) {

            throw new IllegalArgumentException(
                    "A próxima data de manutenção não pode ser anterior à última data de manutenção."
            );
        }

        if (sala.getIdSala() == null &&
                repository.existsByNomeDaOficinaEstilo(
                        sala.getNomeDaOficinaEstilo())) {

            throw new IllegalArgumentException(
                    "Já existe uma sala cadastrada com o nome da oficina/estilo: "
                            + sala.getNomeDaOficinaEstilo()
            );
        }

        return repository.save(sala);
    }

    public List<Sala> listarTodos() {
        return repository.findAll();
    }

    public List<Sala> listarPorEstadoConservacao(String estadoConservacao) {
        return repository.findByEstadoConservacao(estadoConservacao);
    }

    public Sala buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Sala não encontrada: " + id)
                );
    }

    public void excluir(Long id) {
        repository.deleteById(id);
    }
}

