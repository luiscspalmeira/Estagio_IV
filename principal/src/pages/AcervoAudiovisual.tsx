
import { type FormEvent, useState } from "react";

function AcervoAudiovisual() {

  const [idEspetaculo, setIdEspetaculo] = useState("");
  const [dataRegistro, setDataRegistro] = useState("");
  const [tipoMidiaCategoria, setTipoMidiaCategoria] = useState("");
  const [nomeVeiculoImprensaAutor, setNomeVeiculoImprensaAutor] = useState("");
  const [descricaoConteudo, setDescricaoConteudo] = useState("");
  const [palavrasChaveTags, setPalavrasChaveTags] = useState("");
  const [linkDiretoArquivoNuvem, setLinkDiretoArquivoNuvem] = useState("");

  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("Enviando...");

    const dados = {
      idEspetaculo: Number(idEspetaculo),
      dataRegistro,
      tipoMidiaCategoria,
      nomeVeiculoImprensaAutor,
      descricaoConteudo,
      palavrasChaveTags,
      linkDiretoArquivoNuvem
    };

    try {
      const resposta = await fetch(
        "http://localhost:8080/acervo-audiovisual",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dados)
        }
      );

      const resultado = await resposta.json().catch(() => null);

      if (!resposta.ok) {
        setMensagem(
          resultado ||
          "Erro ao cadastrar o acervo audiovisual."
        );
        return;
      }

      setMensagem(
        `Acervo audiovisual cadastrado com sucesso! ID: ${resultado.idAcervoMidia}`
      );

      setIdEspetaculo("");
      setDataRegistro("");
      setTipoMidiaCategoria("");
      setNomeVeiculoImprensaAutor("");
      setDescricaoConteudo("");
      setPalavrasChaveTags("");
      setLinkDiretoArquivoNuvem("");

    } catch (erro) {
      console.error(erro);

      setMensagem(
        "Erro de comunicação com o servidor."
      );
    }
  }

  return (
    <div className="pagina-cadastro">

      <h1>Cadastro de Acervo Audiovisual</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="idEspetaculo">
            ID do Espetáculo
          </label>

          <input
            id="idEspetaculo"
            type="number"
            value={idEspetaculo}
            onChange={(e) => setIdEspetaculo(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="dataRegistro">
            Data do Registro
          </label>

          <input
            id="dataRegistro"
            type="date"
            value={dataRegistro}
            onChange={(e) => setDataRegistro(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="tipoMidiaCategoria">
            Tipo de Mídia / Categoria
          </label>

          <input
            id="tipoMidiaCategoria"
            type="text"
            maxLength={50}
            value={tipoMidiaCategoria}
            onChange={(e) =>
              setTipoMidiaCategoria(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="nomeVeiculoImprensaAutor">
            Nome do Veículo de Imprensa / Autor
          </label>

          <input
            id="nomeVeiculoImprensaAutor"
            type="text"
            maxLength={200}
            value={nomeVeiculoImprensaAutor}
            onChange={(e) =>
              setNomeVeiculoImprensaAutor(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="descricaoConteudo">
            Descrição do Conteúdo
          </label>

          <textarea
            id="descricaoConteudo"
            value={descricaoConteudo}
            onChange={(e) =>
              setDescricaoConteudo(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="palavrasChaveTags">
            Palavras-chave / Tags
          </label>

          <textarea
            id="palavrasChaveTags"
            value={palavrasChaveTags}
            onChange={(e) =>
              setPalavrasChaveTags(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="linkDiretoArquivoNuvem">
            Link Direto do Arquivo / Nuvem
          </label>

          <input
            id="linkDiretoArquivoNuvem"
            type="url"
            value={linkDiretoArquivoNuvem}
            onChange={(e) =>
              setLinkDiretoArquivoNuvem(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Cadastrar Acervo Audiovisual
        </button>

      </form>

      {mensagem && (
        <p>{mensagem}</p>
      )}

    </div>
  );
}

export default AcervoAudiovisual;

