import { type FormEvent, useState } from "react";

function DocumentoEquipe() {
const [idDocumento, setIdDocumento] = useState("");
const [idColaborador, setIdColaborador] = useState("");
const [mensagem, setMensagem] = useState("");

async function handleSubmit(event: FormEvent) {
event.preventDefault();


setMensagem("");

try {
  const response = await fetch(
    "http://localhost:8080/documentos-equipe",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: {
          idDocumento: Number(idDocumento),
          idColaborador: Number(idColaborador),
        },
      }),
    }
  );

  const texto = await response.text();

  if (!response.ok) {
    setMensagem(`Erro: ${texto}`);
    return;
  }

  setMensagem(
    "Documento da equipe cadastrado com sucesso!"
  );

  setIdDocumento("");
  setIdColaborador("");

} catch (error) {
  console.error(error);

  setMensagem(
    "Erro de conexão com o servidor Spring Boot."
  );
}


}

return ( <div className="pagina-cadastro"> <h1>Documento da Equipe</h1>


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
      <label htmlFor="idColaborador">
        ID do Colaborador
      </label>

      <input
        id="idColaborador"
        type="number"
        value={idColaborador}
        onChange={(event) =>
          setIdColaborador(event.target.value)
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

export default DocumentoEquipe;
