
import { type FormEvent, useState } from "react";

export default function CertificacaoEquipe() {
  const [idColaborador, setIdColaborador] = useState("");
  const [nomeTreinamento, setNomeTreinamento] = useState("");
  const [dataConclusao, setDataConclusao] = useState("");
  const [validadeMeses, setValidadeMeses] = useState("");
  const [statusCertificacao, setStatusCertificacao] = useState("");
  const [linkCertificadoPdf, setLinkCertificadoPdf] = useState("");

  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");

    const dados = {
      idColaborador: Number(idColaborador),
      nomeTreinamento,
      dataConclusao,
      validadeMeses:
        validadeMeses === ""
          ? null
          : Number(validadeMeses),
      statusCertificacao:
        statusCertificacao === ""
          ? null
          : statusCertificacao,
      linkCertificadoPdf:
        linkCertificadoPdf === ""
          ? null
          : linkCertificadoPdf,
    };

    try {
      const resposta = await fetch(
        "http://localhost:8080/certificacao-equipe",
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

      const certificacao = JSON.parse(resultado);

      setMensagem(
        `Certificação cadastrada com sucesso! ID: ${certificacao.idCertificado}`
      );

      setIdColaborador("");
      setNomeTreinamento("");
      setDataConclusao("");
      setValidadeMeses("");
      setStatusCertificacao("");
      setLinkCertificadoPdf("");

    } catch (error) {
      if (error instanceof Error) {
        setMensagem(`Erro: ${error.message}`);
      } else {
        setMensagem("Erro ao cadastrar a certificação.");
      }
    }
  }

  return (
    <div className="pagina-cadastro">
      <h1>Certificação da Equipe</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="idColaborador">
            ID do Colaborador
          </label>

          <input
            id="idColaborador"
            type="number"
            value={idColaborador}
            onChange={(e) =>
              setIdColaborador(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="nomeTreinamento">
            Nome do Treinamento
          </label>

          <input
            id="nomeTreinamento"
            type="text"
            maxLength={200}
            value={nomeTreinamento}
            onChange={(e) =>
              setNomeTreinamento(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="dataConclusao">
            Data de Conclusão
          </label>

          <input
            id="dataConclusao"
            type="date"
            value={dataConclusao}
            onChange={(e) =>
              setDataConclusao(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="validadeMeses">
            Validade em Meses
          </label>

          <input
            id="validadeMeses"
            type="number"
            min="1"
            value={validadeMeses}
            onChange={(e) =>
              setValidadeMeses(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="statusCertificacao">
            Status da Certificação
          </label>

          <input
            id="statusCertificacao"
            type="text"
            maxLength={30}
            value={statusCertificacao}
            onChange={(e) =>
              setStatusCertificacao(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="linkCertificadoPdf">
            Link do Certificado PDF
          </label>

          <input
            id="linkCertificadoPdf"
            type="text"
            value={linkCertificadoPdf}
            onChange={(e) =>
              setLinkCertificadoPdf(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Cadastrar Certificação
        </button>
      </form>

      {mensagem && (
        <p>{mensagem}</p>
      )}
    </div>
  );
}

