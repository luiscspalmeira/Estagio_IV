
import { type FormEvent, useState } from "react";

function EspetaculoColetivo() {
  const [idEspetaculo, setIdEspetaculo] = useState("");
  const [idColetivo, setIdColetivo] = useState("");
  const [funcaoParticipacao, setFuncaoParticipacao] = useState("");
  const [observacao, setObservacao] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMensagem("");
    setErro("");

    if (!idEspetaculo || !idColetivo) {
      setErro(
        "Informe o ID do espetáculo e o ID do coletivo/companhia."
      );
      return;
    }

    const dados = {
      id: {
        idEspetaculo: Number(idEspetaculo),
        idColetivo: Number(idColetivo),
      },
      funcaoParticipacao:
        funcaoParticipacao.trim() || null,
      observacao:
        observacao.trim() || null,
    };

    try {
      const resposta = await fetch(
        "http://localhost:8080/espetaculos-coletivos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      const resultado = await resposta.json().catch(() => null);

      if (!resposta.ok) {
        setErro(
          typeof resultado === "string"
            ? resultado
            : "Não foi possível cadastrar o relacionamento."
        );
        return;
      }

      setMensagem(
        "Relacionamento entre espetáculo e coletivo cadastrado com sucesso!"
      );

      setIdEspetaculo("");
      setIdColetivo("");
      setFuncaoParticipacao("");
      setObservacao("");

    } catch (error) {
      console.error(error);

      setErro(
        "Não foi possível conectar ao servidor Spring Boot."
      );
    }
  }

  return (
    <div className="pagina-cadastro">

      <h1>Espetáculo x Coletivo / Companhia</h1>

      <p>
        Cadastre a participação de um coletivo ou companhia
        em um espetáculo.
      </p>

      {mensagem && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #198754",
          }}
        >
          {mensagem}
        </div>
      )}

      {erro && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #dc3545",
          }}
        >
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="idEspetaculo">
            ID do espetáculo
          </label>

          <input
            id="idEspetaculo"
            type="number"
            min="1"
            value={idEspetaculo}
            onChange={(event) =>
              setIdEspetaculo(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="idColetivo">
            ID do coletivo / companhia
          </label>

          <input
            id="idColetivo"
            type="number"
            min="1"
            value={idColetivo}
            onChange={(event) =>
              setIdColetivo(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="funcaoParticipacao">
            Função da participação
          </label>

          <input
            id="funcaoParticipacao"
            type="text"
            maxLength={100}
            value={funcaoParticipacao}
            onChange={(event) =>
              setFuncaoParticipacao(event.target.value)
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
            onChange={(event) =>
              setObservacao(event.target.value)
            }
            rows={5}
          />
        </div>

        <button type="submit">
          Cadastrar participação
        </button>

      </form>
    </div>
  );
}

export default EspetaculoColetivo;

