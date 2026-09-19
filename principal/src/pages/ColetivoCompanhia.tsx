
import { type FormEvent, useState } from "react";

export default function ColetivoCompanhia() {
  const [nomeDoGrupoCompanhia,
    setNomeDoGrupoCompanhia] = useState("");

  const [anoFundacao, setAnoFundacao] =
    useState("");

  const [responsavelLiderancaNome,
    setResponsavelLiderancaNome] = useState("");

  const [estiloPesquisaArtistica,
    setEstiloPesquisaArtistica] = useState("");

  const [statusAtuacaoAtual,
    setStatusAtuacaoAtual] = useState("");

  const [projetosRealizadosFunceb,
    setProjetosRealizadosFunceb] = useState("");

  const [contatosRepresentante,
    setContatosRepresentante] = useState("");

  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMensagem("");

    const dados = {
      nomeDoGrupoCompanhia,

      anoFundacao:
        anoFundacao === ""
          ? null
          : Number(anoFundacao),

      responsavelLiderancaNome:
        responsavelLiderancaNome === ""
          ? null
          : responsavelLiderancaNome,

      estiloPesquisaArtistica:
        estiloPesquisaArtistica === ""
          ? null
          : estiloPesquisaArtistica,

      statusAtuacaoAtual:
        statusAtuacaoAtual === ""
          ? null
          : statusAtuacaoAtual,

      projetosRealizadosFunceb:
        projetosRealizadosFunceb === ""
          ? null
          : projetosRealizadosFunceb,

      contatosRepresentante:
        contatosRepresentante === ""
          ? null
          : contatosRepresentante,
    };

    try {
      const resposta = await fetch(
        "http://localhost:8080/coletivos-companhias",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      const resultado = await resposta.text();

      if (!resposta.ok) {
        throw new Error(resultado);
      }

      const coletivo = JSON.parse(resultado);

      setMensagem(
        `Coletivo/companhia cadastrado com sucesso! ID: ${coletivo.idColetivo}`
      );

      setNomeDoGrupoCompanhia("");
      setAnoFundacao("");
      setResponsavelLiderancaNome("");
      setEstiloPesquisaArtistica("");
      setStatusAtuacaoAtual("");
      setProjetosRealizadosFunceb("");
      setContatosRepresentante("");

    } catch (error) {

      if (error instanceof Error) {
        setMensagem(`Erro: ${error.message}`);
      } else {
        setMensagem(
          "Erro ao cadastrar o coletivo/companhia."
        );
      }
    }
  }

  return (
    <div className="pagina-cadastro">

      <h1>Cadastro de Coletivo / Companhia</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="nomeDoGrupoCompanhia">
            Nome do Grupo / Companhia
          </label>

          <input
            id="nomeDoGrupoCompanhia"
            type="text"
            maxLength={200}
            value={nomeDoGrupoCompanhia}
            onChange={(e) =>
              setNomeDoGrupoCompanhia(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="anoFundacao">
            Ano de Fundação
          </label>

          <input
            id="anoFundacao"
            type="number"
            min="1800"
            max="2200"
            value={anoFundacao}
            onChange={(e) =>
              setAnoFundacao(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="responsavelLiderancaNome">
            Responsável / Liderança — Nome
          </label>

          <input
            id="responsavelLiderancaNome"
            type="text"
            maxLength={150}
            value={responsavelLiderancaNome}
            onChange={(e) =>
              setResponsavelLiderancaNome(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="estiloPesquisaArtistica">
            Estilo / Pesquisa Artística
          </label>

          <input
            id="estiloPesquisaArtistica"
            type="text"
            maxLength={150}
            value={estiloPesquisaArtistica}
            onChange={(e) =>
              setEstiloPesquisaArtistica(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="statusAtuacaoAtual">
            Status de Atuação Atual
          </label>

          <input
            id="statusAtuacaoAtual"
            type="text"
            maxLength={50}
            value={statusAtuacaoAtual}
            onChange={(e) =>
              setStatusAtuacaoAtual(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="projetosRealizadosFunceb">
            Projetos Realizados — FUNCEB
          </label>

          <textarea
            id="projetosRealizadosFunceb"
            value={projetosRealizadosFunceb}
            onChange={(e) =>
              setProjetosRealizadosFunceb(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="contatosRepresentante">
            Contatos do Representante
          </label>

          <textarea
            id="contatosRepresentante"
            value={contatosRepresentante}
            onChange={(e) =>
              setContatosRepresentante(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Cadastrar Coletivo / Companhia
        </button>

      </form>

      {mensagem && (
        <p>{mensagem}</p>
      )}

    </div>
  );
}

