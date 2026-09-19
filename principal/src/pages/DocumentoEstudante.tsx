
import { type FormEvent, useState } from "react";

function DocumentoEstudante() {

  const [idDocumento, setIdDocumento] = useState("");
  const [idAluno, setIdAluno] = useState("");

  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMensagem("Enviando...");

    const dados = {
      id: {
        idDocumento: Number(idDocumento),
        idAluno: Number(idAluno)
      }
    };

    try {

      const resposta = await fetch(
        "http://localhost:8080/documentos-estudantes",
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
          "Erro ao vincular o documento ao estudante."
        );

        return;
      }

      setMensagem(
        `Documento ${resultado.id.idDocumento} vinculado ao estudante ${resultado.id.idAluno} com sucesso!`
      );

      setIdDocumento("");
      setIdAluno("");

    } catch (erro) {

      console.error(erro);

      setMensagem(
        "Erro de comunicação com o servidor."
      );
    }
  }

  return (
    <div className="pagina-cadastro">

      <h1>Documento do Estudante</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="idDocumento">
            ID do Documento
          </label>

          <input
            id="idDocumento"
            type="number"
            min="1"
            value={idDocumento}
            onChange={(e) =>
              setIdDocumento(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="idAluno">
            ID do Estudante
          </label>

          <input
            id="idAluno"
            type="number"
            min="1"
            value={idAluno}
            onChange={(e) =>
              setIdAluno(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          Vincular Documento ao Estudante
        </button>

      </form>

      {mensagem && (
        <p>{mensagem}</p>
      )}

    </div>
  );
}

export default DocumentoEstudante;

