
import { type FormEvent, useState } from "react";

function DocumentoFamiliar() {

  const [idDocumento, setIdDocumento] = useState("");
  const [idFamiliar, setIdFamiliar] = useState("");

  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMensagem("Enviando...");

    const dados = {
      id: {
        idDocumento: Number(idDocumento),
        idFamiliar: Number(idFamiliar)
      }
    };

    try {

      const resposta = await fetch(
        "http://localhost:8080/documentos-familiares",
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
          "Erro ao vincular o documento ao familiar."
        );

        return;
      }

      setMensagem(
        `Documento ${resultado.id.idDocumento} vinculado ao familiar ${resultado.id.idFamiliar} com sucesso!`
      );

      setIdDocumento("");
      setIdFamiliar("");

    } catch (erro) {

      console.error(erro);

      setMensagem(
        "Erro de comunicação com o servidor."
      );
    }
  }

  return (
    <div className="pagina-cadastro">

      <h1>Documento do Familiar</h1>

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
          <label htmlFor="idFamiliar">
            ID do Familiar
          </label>

          <input
            id="idFamiliar"
            type="number"
            min="1"
            value={idFamiliar}
            onChange={(e) =>
              setIdFamiliar(e.target.value)
            }
            required
          />
        </div>

        <button type="submit">
          Vincular Documento ao Familiar
        </button>

      </form>

      {mensagem && (
        <p>{mensagem}</p>
      )}

    </div>
  );
}

export default DocumentoFamiliar;

