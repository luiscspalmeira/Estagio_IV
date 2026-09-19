
package br.com.principal.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "acervo_audiovisual")
public class AcervoAudiovisual {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_acervo_midia")
    private Long idAcervoMidia;

    @Column(name = "id_espetaculo", nullable = false)
    private Long idEspetaculo;

    @Column(name = "data_registro", nullable = false)
    private LocalDate dataRegistro;

    @Column(name = "tipo_midia_categoria", nullable = false, length = 50)
    private String tipoMidiaCategoria;

    @Column(name = "nome_veiculo_imprensa_autor", length = 200)
    private String nomeVeiculoImprensaAutor;

    @Column(name = "descricao_conteudo", columnDefinition = "TEXT")
    private String descricaoConteudo;

    @Column(name = "palavras_chave_tags", columnDefinition = "TEXT")
    private String palavrasChaveTags;

    @Column(name = "link_direto_arquivo_nuvem", columnDefinition = "TEXT")
    private String linkDiretoArquivoNuvem;

    public Long getIdAcervoMidia() {
        return idAcervoMidia;
    }

    public void setIdAcervoMidia(Long idAcervoMidia) {
        this.idAcervoMidia = idAcervoMidia;
    }

    public Long getIdEspetaculo() {
        return idEspetaculo;
    }

    public void setIdEspetaculo(Long idEspetaculo) {
        this.idEspetaculo = idEspetaculo;
    }

    public LocalDate getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDate dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public String getTipoMidiaCategoria() {
        return tipoMidiaCategoria;
    }

    public void setTipoMidiaCategoria(String tipoMidiaCategoria) {
        this.tipoMidiaCategoria = tipoMidiaCategoria;
    }

    public String getNomeVeiculoImprensaAutor() {
        return nomeVeiculoImprensaAutor;
    }

    public void setNomeVeiculoImprensaAutor(String nomeVeiculoImprensaAutor) {
        this.nomeVeiculoImprensaAutor = nomeVeiculoImprensaAutor;
    }

    public String getDescricaoConteudo() {
        return descricaoConteudo;
    }

    public void setDescricaoConteudo(String descricaoConteudo) {
        this.descricaoConteudo = descricaoConteudo;
    }

    public String getPalavrasChaveTags() {
        return palavrasChaveTags;
    }

    public void setPalavrasChaveTags(String palavrasChaveTags) {
        this.palavrasChaveTags = palavrasChaveTags;
    }

    public String getLinkDiretoArquivoNuvem() {
        return linkDiretoArquivoNuvem;
    }

    public void setLinkDiretoArquivoNuvem(String linkDiretoArquivoNuvem) {
        this.linkDiretoArquivoNuvem = linkDiretoArquivoNuvem;
    }
}

