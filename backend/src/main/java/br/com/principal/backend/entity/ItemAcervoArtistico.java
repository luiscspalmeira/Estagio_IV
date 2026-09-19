package br.com.principal.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "item_acervo_artistico")
public class ItemAcervoArtistico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_item_acervo")
    private Long idItemAcervo;

    @Column(name = "categoria_item", nullable = false, length = 100)
    private String categoriaItem;

    @Column(name = "nome_peca_descricao", nullable = false, length = 250)
    private String nomePecaDescricao;

    @Column(name = "tamanho_dimensao", length = 100)
    private String tamanhoDimensao;

    @Column(name = "quantidade_total", nullable = false)
    private Integer quantidadeTotal = 1;

    @Column(name = "quantidade_disponivel", nullable = false)
    private Integer quantidadeDisponivel = 1;

    @Column(name = "local_armazenamento", length = 200)
    private String localArmazenamento;

    @Column(name = "estado_conservacao", length = 50)
    private String estadoConservacao;

    @Column(name = "historico_uso_espetaculo")
    private String historicoUsoEspetaculo;

    @Column(name = "observacoes")
    private String observacoes;

    public ItemAcervoArtistico() {
    }

    public Long getIdItemAcervo() {
        return idItemAcervo;
    }

    public void setIdItemAcervo(Long idItemAcervo) {
        this.idItemAcervo = idItemAcervo;
    }

    public String getCategoriaItem() {
        return categoriaItem;
    }

    public void setCategoriaItem(String categoriaItem) {
        this.categoriaItem = categoriaItem;
    }

    public String getNomePecaDescricao() {
        return nomePecaDescricao;
    }

    public void setNomePecaDescricao(String nomePecaDescricao) {
        this.nomePecaDescricao = nomePecaDescricao;
    }

    public String getTamanhoDimensao() {
        return tamanhoDimensao;
    }

    public void setTamanhoDimensao(String tamanhoDimensao) {
        this.tamanhoDimensao = tamanhoDimensao;
    }

    public Integer getQuantidadeTotal() {
        return quantidadeTotal;
    }

    public void setQuantidadeTotal(Integer quantidadeTotal) {
        this.quantidadeTotal = quantidadeTotal;
    }

    public Integer getQuantidadeDisponivel() {
        return quantidadeDisponivel;
    }

    public void setQuantidadeDisponivel(Integer quantidadeDisponivel) {
        this.quantidadeDisponivel = quantidadeDisponivel;
    }

    public String getLocalArmazenamento() {
        return localArmazenamento;
    }

    public void setLocalArmazenamento(String localArmazenamento) {
        this.localArmazenamento = localArmazenamento;
    }

    public String getEstadoConservacao() {
        return estadoConservacao;
    }

    public void setEstadoConservacao(String estadoConservacao) {
        this.estadoConservacao = estadoConservacao;
    }

    public String getHistoricoUsoEspetaculo() {
        return historicoUsoEspetaculo;
    }

    public void setHistoricoUsoEspetaculo(String historicoUsoEspetaculo) {
        this.historicoUsoEspetaculo = historicoUsoEspetaculo;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}

