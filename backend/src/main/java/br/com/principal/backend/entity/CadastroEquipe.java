
package br.com.principal.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
    name = "cadastro_equipe",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uq_equipe_cpf",
            columnNames = "cpf"
        )
    }
)
public class CadastroEquipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_colaborador")
    private Long idColaborador;

    @Column(name = "nome_completo", nullable = false, length = 150)
    private String nomeCompleto;

    @Column(name = "nome_social", length = 150)
    private String nomeSocial;

    @Column(name = "cpf", nullable = false, length = 11)
    private String cpf;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @Column(name = "e_mail", length = 150)
    private String eMail;

    @Column(name = "cep", length = 8)
    private String cep;

    @Column(name = "endereco", length = 250)
    private String endereco;

    @Column(name = "cor_raca", length = 30)
    private String corRaca;

    @Column(name = "vinculo_institucional", length = 100)
    private String vinculoInstitucional;

    @Column(name = "funcao_especifica", length = 150)
    private String funcaoEspecifica;

    @Column(name = "numero_edital_selecao", length = 100)
    private String numeroEditalSelecao;

    @Column(name = "numero_termo_compromisso", length = 100)
    private String numeroTermoCompromisso;

    @Column(name = "instituicao_ensino_origem", length = 200)
    private String instituicaoEnsinoOrigem;

    @Column(name = "supervisor_responsavel_nome", length = 150)
    private String supervisorResponsavelNome;

    @Column(name = "data_inicio_vinculo")
    private LocalDate dataInicioVinculo;

    @Column(name = "data_fim_prevista")
    private LocalDate dataFimPrevista;

    @Column(
        name = "status_contract",
        nullable = false,
        length = 30
    )
    private String statusContract = "ATIVO";

    public Long getIdColaborador() {
        return idColaborador;
    }

    public void setIdColaborador(Long idColaborador) {
        this.idColaborador = idColaborador;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getNomeSocial() {
        return nomeSocial;
    }

    public void setNomeSocial(String nomeSocial) {
        this.nomeSocial = nomeSocial;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String geteMail() {
        return eMail;
    }

    public void seteMail(String eMail) {
        this.eMail = eMail;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getCorRaca() {
        return corRaca;
    }

    public void setCorRaca(String corRaca) {
        this.corRaca = corRaca;
    }

    public String getVinculoInstitucional() {
        return vinculoInstitucional;
    }

    public void setVinculoInstitucional(String vinculoInstitucional) {
        this.vinculoInstitucional = vinculoInstitucional;
    }

    public String getFuncaoEspecifica() {
        return funcaoEspecifica;
    }

    public void setFuncaoEspecifica(String funcaoEspecifica) {
        this.funcaoEspecifica = funcaoEspecifica;
    }

    public String getNumeroEditalSelecao() {
        return numeroEditalSelecao;
    }

    public void setNumeroEditalSelecao(String numeroEditalSelecao) {
        this.numeroEditalSelecao = numeroEditalSelecao;
    }

    public String getNumeroTermoCompromisso() {
        return numeroTermoCompromisso;
    }

    public void setNumeroTermoCompromisso(String numeroTermoCompromisso) {
        this.numeroTermoCompromisso = numeroTermoCompromisso;
    }

    public String getInstituicaoEnsinoOrigem() {
        return instituicaoEnsinoOrigem;
    }

    public void setInstituicaoEnsinoOrigem(String instituicaoEnsinoOrigem) {
        this.instituicaoEnsinoOrigem = instituicaoEnsinoOrigem;
    }

    public String getSupervisorResponsavelNome() {
        return supervisorResponsavelNome;
    }

    public void setSupervisorResponsavelNome(String supervisorResponsavelNome) {
        this.supervisorResponsavelNome = supervisorResponsavelNome;
    }

    public LocalDate getDataInicioVinculo() {
        return dataInicioVinculo;
    }

    public void setDataInicioVinculo(LocalDate dataInicioVinculo) {
        this.dataInicioVinculo = dataInicioVinculo;
    }

    public LocalDate getDataFimPrevista() {
        return dataFimPrevista;
    }

    public void setDataFimPrevista(LocalDate dataFimPrevista) {
        this.dataFimPrevista = dataFimPrevista;
    }

    public String getStatusContract() {
        return statusContract;
    }

    public void setStatusContract(String statusContract) {
        this.statusContract = statusContract;
    }
}

