
import { type FormEvent, useState } from "react";

export default function ItemAcervoArtistico() {
  const [categoriaItem, setCategoriaItem] = useState("");
  const [nomePecaDescricao, setNomePecaDescricao] = useState("");
  const [tamanhoDimensao, setTamanhoDimensao] = useState("");
  const [quantidadeTotal, setQuantidadeTotal] = useState("1");
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState("1");
  const [localArmazenamento, setLocalArmazenamento] = useState("");
  const [estadoConservacao, setEstadoConservacao] = useState("");
  const [historicoUsoEspetaculo, setHistoricoUsoEspetaculo] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMensagem("");

    const dados = {
      categoriaItem,
      nomePecaDescricao,
      tamanhoDimensao:
        tamanhoDimensao === ""
          ? null
          : tamanhoDimensao,
      quantidadeTotal: Number(quantidadeTotal),
      quantidadeDisponivel: Number(quantidadeDisponivel),
      localArmazenamento:
        localArmazenamento === ""
          ? null
          : localArmazenamento,
      estadoConservacao:
        estadoConservacao === ""
          ? null
          : estadoConservacao,
      historicoUsoEspetaculo:
        historicoUsoEspetaculo === ""
          ? null
          : historicoUsoEspetaculo,
      observacoes:
        observacoes === ""
          ? null
          : observacoes,
    };

    try {
      const resposta = await fetch(
        "http://localhost:8080/item-acervo-artistico",
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

      const item = JSON.parse(resultado);

      setMensagem(
        `Item do acervo cadastrado com sucesso! ID: ${item.idItemAcervo}`
      );

      setCategoriaItem("");
      setNomePecaDescricao("");
      setTamanhoDimensao("");
      setQuantidadeTotal("1");
      setQuantidadeDisponivel("1");
      setLocalArmazenamento("");
      setEstadoConservacao("");
      setHistoricoUsoEspetaculo("");
      setObservacoes("");

    } catch (error) {
      if (error instanceof Error) {
        setMensagem(`Erro: ${error.message}`);
      } else {
        setMensagem(
          "Erro ao cadastrar o item do acervo."
        );
      }
    }
  }

  return (
    <div className="pagina-cadastro">
      <h1>Item do Acervo Artístico</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label htmlFor="categoriaItem">
            Categoria do Item
          </label>

          <input
            id="categoriaItem"
            type="text"
            maxLength={100}
            value={categoriaItem}
            onChange={(e) =>
              setCategoriaItem(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="nomePecaDescricao">
            Nome da Peça / Descrição
          </label>

          <input
            id="nomePecaDescricao"
            type="text"
            maxLength={250}
            value={nomePecaDescricao}
            onChange={(e) =>
              setNomePecaDescricao(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="tamanhoDimensao">
            Tamanho / Dimensão
          </label>

          <input
            id="tamanhoDimensao"
            type="text"
            maxLength={100}
            value={tamanhoDimensao}
            onChange={(e) =>
              setTamanhoDimensao(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="quantidadeTotal">
            Quantidade Total
          </label>

          <input
            id="quantidadeTotal"
            type="number"
            min="0"
            value={quantidadeTotal}
            onChange={(e) =>
              setQuantidadeTotal(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="quantidadeDisponivel">
            Quantidade Disponível
          </label>

          <input
            id="quantidadeDisponivel"
            type="number"
            min="0"
            value={quantidadeDisponivel}
            onChange={(e) =>
              setQuantidadeDisponivel(e.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="localArmazenamento">
            Local de Armazenamento
          </label>

          <input
            id="localArmazenamento"
            type="text"
            maxLength={200}
            value={localArmazenamento}
            onChange={(e) =>
              setLocalArmazenamento(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="estadoConservacao">
            Estado de Conservação
          </label>

          <input
            id="estadoConservacao"
            type="text"
            maxLength={50}
            value={estadoConservacao}
            onChange={(e) =>
              setEstadoConservacao(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="historicoUsoEspetaculo">
            Histórico de Uso em Espetáculo
          </label>

          <textarea
            id="historicoUsoEspetaculo"
            value={historicoUsoEspetaculo}
            onChange={(e) =>
              setHistoricoUsoEspetaculo(e.target.value)
            }
          />
        </div>

        <div>
          <label htmlFor="observacoes">
            Observações
          </label>

          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(e) =>
              setObservacoes(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Cadastrar Item do Acervo
        </button>

      </form>

      {mensagem && (
        <p>{mensagem}</p>
      )}
    </div>
  );
}

