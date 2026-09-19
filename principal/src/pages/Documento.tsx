
import { type FormEvent, useState } from "react";

function Documento() {

  const [tipoDocumento, setTipoDocumento] = useState("");
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [linkArquivo, setLinkArquivo] = useState("");
  const [dataValidade, setDataValidade] = useState("");
  const [observacao, setObservacao] = useState("");

  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMensagem("Enviando...");

    const dados = {
      tipoDocumento,
      nomeArquivo,
      linkArquivo,
      dataValidade: dataValidade || null,
      observacao
    };

    try {

      const resposta = await fetch(
        "http://localhost:8080/documentos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dados)
        }
      );

      const resultado = await resposta
        .json()
        .catch(() => null);

      if (!resposta.ok) {

        setMensagem(
          resultado ||
          "Erro ao cadastrar o documento."
        );

        return;
      }

      setMensagem(
        `Documento cadastrado com sucesso! ID: ${resultado.idDocumento}`
      );

      setTipoDocumento("");
      setNomeArquivo("");
      setLinkArquivo("");
      setDataValidade("");
      setObservacao("");

    } catch (erro) {

      console.error(erro);

      setMensagem(
        "Erro de comunicação com o servidor."
      );
    }
  }

  return (
    <div className="pagina-cadastro">

      <h1>Cadastro de Documento</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="tipoDocumento">
            Tipo de Documento
          </label>

          <input
            id="tipoDocumento"
            type="text"
            maxLength={100}
            value={tipoDocumento}
            onChange={(e) =>
              setTipoDocumento(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="nomeArquivo">
            Nome do Arquivo
          </label>

          <input
            id="nomeArquivo"
            type="text"
            maxLength={255}
            value={nomeArquivo}
            onChange={(e) =>
              setNomeArquivo(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="linkArquivo">
            Link do Arquivo
          </label>

          <input
            id="linkArquivo"
            type="url"
            value={linkArquivo}
            onChange={(e) =>
              setLinkArquivo(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="dataValidade">
            Data de Validade
          </label>

          <input
            id="dataValidade"
            type="date"
            value={dataValidade}
            onChange={(e) =>
              setDataValidade(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="observacao">
            Observação
          </label>

          <textarea
            id="observacao"
            value={observacao}
            onChange={(e) =>
              setObservacao(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Cadastrar Documento
        </button>

      </form>

      {mensagem && (
        <p>{mensagem}</p>
      )}

    </div>
  );
}

export default Documento;

