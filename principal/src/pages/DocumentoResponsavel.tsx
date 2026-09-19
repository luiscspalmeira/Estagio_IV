import { type FormEvent, useState } from "react";

function DocumentoResponsavel() {
const [idDocumento, setIdDocumento] = useState("");
const [idResponsavel, setIdResponsavel] = useState("");
const [mensagem, setMensagem] = useState("");

async function handleSubmit(event: FormEvent) {
event.preventDefault();


setMensagem("");

try {
  const response = await fetch(
    "http://localhost:8080/documentos-responsaveis",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: {
          idDocumento: Number(idDocumento),
          idResponsavel: Number(idResponsavel),
        },
      }),
    }
  );

  const texto = await response.text();

  if (!response.ok) {
    setMensagem(`Erro: ${texto}`);
    return;
  }

  setMensagem("Documento do responsável cadastrado com sucesso!");

  setIdDocumento("");
  setIdResponsavel("");

} catch (error) {
  console.error(error);
  setMensagem(
    "Erro de conexão com o servidor Spring Boot."
  );
}


}

return ( <div className="pagina-cadastro"> <h1>Documento de Responsável Legal</h1>


  <form onSubmit={handleSubmit}>

    <div>
      <label htmlFor="idDocumento">
        ID do Documento
      </label>

      <input
        id="idDocumento"
        type="number"
        value={idDocumento}
        onChange={(event) =>
          setIdDocumento(event.target.value)
        }
        required
      />
    </div>

    <div>
      <label htmlFor="idResponsavel">
        ID do Responsável Legal
      </label>

      <input
        id="idResponsavel"
        type="number"
        value={idResponsavel}
        onChange={(event) =>
          setIdResponsavel(event.target.value)
        }
        required
      />
    </div>

    <button type="submit">
      Cadastrar vínculo
    </button>

  </form>

  {mensagem && (
    <p>{mensagem}</p>
  )}
</div>


);
}

export default DocumentoResponsavel;
