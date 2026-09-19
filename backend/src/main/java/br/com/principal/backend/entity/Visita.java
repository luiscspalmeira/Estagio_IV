
package br.com.principal.backend.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "visita")
public class Visita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_visita")
    private Long idVisita;

    @Column(name = "nome_completo_visitante", nullable = false, length = 150)
    private String nomeCompletoVisitante;

    @Column(name = "rg_cpf_visitante", length = 30)
    private String rgCpfVisitante;

    @Column(name = "telefone_contato", length = 20)
    private String telefoneContato;

    @Column(name = "tipo_visitante", length = 50)
    private String tipoVisitante;

    @Column(name = "id_sala")
    private Long idSala;

    @Column(name = "id_colaborador_responsavel_recepcao")
    private Long idColaboradorResponsavelRecepcao;

    @Column(name = "data_visita", nullable = false)
    private LocalDate dataVisita;

    @Column(name = "horario_entrada", nullable = false)
    private LocalTime horarioEntrada;

    @Column(name = "horario_saida")
    private LocalTime horarioSaida;

    @Column(
        name = "assinou_termo_seguranca_lgpd",
        nullable = false
    )
    private Boolean assinouTermoSegurancaLgpd = false;

    public Visita() {
    }

    public Long getIdVisita() {
        return idVisita;
    }

    public void setIdVisita(Long idVisita) {
        this.idVisita = idVisita;
    }

    public String getNomeCompletoVisitante() {
        return nomeCompletoVisitante;
    }

    public void setNomeCompletoVisitante(String nomeCompletoVisitante) {
        this.nomeCompletoVisitante = nomeCompletoVisitante;
    }

    public String getRgCpfVisitante() {
        return rgCpfVisitante;
    }

    public void setRgCpfVisitante(String rgCpfVisitante) {
        this.rgCpfVisitante = rgCpfVisitante;
    }

    public String getTelefoneContato() {
        return telefoneContato;
    }

    public void setTelefoneContato(String telefoneContato) {
        this.telefoneContato = telefoneContato;
    }

    public String getTipoVisitante() {
        return tipoVisitante;
    }

    public void setTipoVisitante(String tipoVisitante) {
        this.tipoVisitante = tipoVisitante;
    }

    public Long getIdSala() {
        return idSala;
    }

    public void setIdSala(Long idSala) {
        this.idSala = idSala;
    }

    public Long getIdColaboradorResponsavelRecepcao() {
        return idColaboradorResponsavelRecepcao;
    }

    public void setIdColaboradorResponsavelRecepcao(
            Long idColaboradorResponsavelRecepcao) {
        this.idColaboradorResponsavelRecepcao =
                idColaboradorResponsavelRecepcao;
    }

    public LocalDate getDataVisita() {
        return dataVisita;
    }

    public void setDataVisita(LocalDate dataVisita) {
        this.dataVisita = dataVisita;
    }

    public LocalTime getHorarioEntrada() {
        return horarioEntrada;
    }

    public void setHorarioEntrada(LocalTime horarioEntrada) {
        this.horarioEntrada = horarioEntrada;
    }

    public LocalTime getHorarioSaida() {
        return horarioSaida;
    }

    public void setHorarioSaida(LocalTime horarioSaida) {
        this.horarioSaida = horarioSaida;
    }

    public Boolean getAssinouTermoSegurancaLgpd() {
        return assinouTermoSegurancaLgpd;
    }

    public void setAssinouTermoSegurancaLgpd(
            Boolean assinouTermoSegurancaLgpd) {
        this.assinouTermoSegurancaLgpd =
                assinouTermoSegurancaLgpd;
    }
}

