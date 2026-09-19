
package br.com.principal.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "avaliacao_multidisciplinar")
public class AvaliacaoMultidisciplinar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avaliacao")
    private Long idAvaliacao;

    @Column(name = "id_aluno", nullable = false)
    private Long idAluno;

    @Column(name = "id_colaborador")
    private Long idColaborador;

    @Column(name = "data_avaliacao", nullable = false)
    private LocalDate dataAvaliacao;

    @Column(name = "especialidade_atendimento", length = 100)
    private String especialidadeAtendimento;

    @Column(name = "profissional_nome", length = 150)
    private String profissionalNome;

    @Column(name = "profissional_funcao_cargo", length = 150)
    private String profissionalFuncaoCargo;

    @Column(name = "parecer_tecnico_individualizado")
    private String parecerTecnicoIndividualizado;

    @Column(name = "encaminhamentos_e_acoes")
    private String encaminhamentosEacoes;

    public AvaliacaoMultidisciplinar() {
    }

    public Long getIdAvaliacao() {
        return idAvaliacao;
    }

    public void setIdAvaliacao(Long idAvaliacao) {
        this.idAvaliacao = idAvaliacao;
    }

    public Long getIdAluno() {
        return idAluno;
    }

    public void setIdAluno(Long idAluno) {
        this.idAluno = idAluno;
    }

    public Long getIdColaborador() {
        return idColaborador;
    }

    public void setIdColaborador(Long idColaborador) {
        this.idColaborador = idColaborador;
    }

    public LocalDate getDataAvaliacao() {
        return dataAvaliacao;
    }

    public void setDataAvaliacao(LocalDate dataAvaliacao) {
        this.dataAvaliacao = dataAvaliacao;
    }

    public String getEspecialidadeAtendimento() {
        return especialidadeAtendimento;
    }

    public void setEspecialidadeAtendimento(
            String especialidadeAtendimento) {
        this.especialidadeAtendimento = especialidadeAtendimento;
    }

    public String getProfissionalNome() {
        return profissionalNome;
    }

    public void setProfissionalNome(String profissionalNome) {
        this.profissionalNome = profissionalNome;
    }

    public String getProfissionalFuncaoCargo() {
        return profissionalFuncaoCargo;
    }

    public void setProfissionalFuncaoCargo(
            String profissionalFuncaoCargo) {
        this.profissionalFuncaoCargo = profissionalFuncaoCargo;
    }

    public String getParecerTecnicoIndividualizado() {
        return parecerTecnicoIndividualizado;
    }

    public void setParecerTecnicoIndividualizado(
            String parecerTecnicoIndividualizado) {
        this.parecerTecnicoIndividualizado =
                parecerTecnicoIndividualizado;
    }

    public String getEncaminhamentosEacoes() {
        return encaminhamentosEacoes;
    }

    public void setEncaminhamentosEacoes(
            String encaminhamentosEacoes) {
        this.encaminhamentosEacoes = encaminhamentosEacoes;
    }
}

