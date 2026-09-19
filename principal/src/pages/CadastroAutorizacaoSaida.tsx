
import { useEffect, useState } from 'react'
import './CadastroAutorizacaoSaida.css'

interface Estudante {
  idAluno: number
  nomeCompleto: string
}

function CadastroAutorizacaoSaida() {

  const [estudantes, setEstudantes] = useState<Estudante[]>([])

  const [idAluno, setIdAluno] = useState('')
  const [tipoAutorizacao, setTipoAutorizacao] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [observacao, setObservacao] = useState('')

  const [mensagem, setMensagem] = useState('')

  useEffect(() => {

    async function carregarEstudantes() {

      try {

        const resposta = await fetch(
          'http://localhost:8080/estudantes'
        )

        if (!resposta.ok) {
          throw new Error(
            'Erro ao carregar estudantes.'
          )
        }

        const dados = await resposta.json()

        setEstudantes(dados)

      } catch (error) {

        console.error(error)

        setMensagem(
          'Não foi possível carregar os estudantes.'
        )
      }
    }

    carregarEstudantes()

  }, [])

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {

    event.preventDefault()

    setMensagem(
      'Cadastrando autorização de saída...'
    )

    try {

      const resposta = await fetch(
        'http://localhost:8080/autorizacoes-saida',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            idAluno: Number(idAluno),

            tipoAutorizacao,

            dataInicio:
              dataInicio || null,

            dataFim:
              dataFim || null,

            observacao:
              observacao || null

          })
        }
      )

      if (!resposta.ok) {

        const erro = await resposta.text()

        console.error(
          'Erro retornado pela API:',
          erro
        )

        throw new Error(
          'Erro ao cadastrar autorização de saída.'
        )
      }

      const autorizacao =
        await resposta.json()

      console.log(
        'Autorização cadastrada:',
        autorizacao
      )

      setMensagem(
        `Autorização cadastrada com sucesso! ID: ${autorizacao.idAutorizacao}`
      )

      setIdAluno('')
      setTipoAutorizacao('')
      setDataInicio('')
      setDataFim('')
      setObservacao('')

    } catch (error) {

      console.error(error)

      setMensagem(
        'Não foi possível cadastrar a autorização de saída.'
      )
    }
  }

  return (
    <div className="cadastro-autorizacao-container">

      <h1>
        Autorização de Saída
      </h1>

      <p>
        Cadastre uma autorização de saída para o estudante.
      </p>

      <form onSubmit={handleSubmit}>

        <div>

          <label htmlFor="idAluno">
            Estudante
          </label>

          <select
            id="idAluno"
            name="idAluno"
            value={idAluno}
            onChange={(e) =>
              setIdAluno(e.target.value)
            }
            required
          >

            <option value="">
              Selecione o estudante
            </option>

            {estudantes.map((estudante) => (

              <option
                key={estudante.idAluno}
                value={estudante.idAluno}
              >
                {estudante.idAluno} - {estudante.nomeCompleto}
              </option>

            ))}

          </select>

        </div>

        <div>

          <label htmlFor="tipoAutorizacao">
            Tipo de autorização
          </label>

          <select
            id="tipoAutorizacao"
            name="tipoAutorizacao"
            value={tipoAutorizacao}
            onChange={(e) =>
              setTipoAutorizacao(e.target.value)
            }
            required
          >

            <option value="">
              Selecione o tipo de autorização
            </option>

            <option value="Somente Responsável">
              Somente Responsável
            </option>

            <option value="Responsável ou Acompanhante">
              Responsável ou Acompanhante
            </option>

            <option value="Saída Independente">
              Saída Independente
            </option>

          </select>

        </div>

        <div>

          <label htmlFor="dataInicio">
            Data de início
          </label>

          <input
            type="date"
            id="dataInicio"
            name="dataInicio"
            value={dataInicio}
            onChange={(e) =>
              setDataInicio(e.target.value)
            }
          />

        </div>

        <div>

          <label htmlFor="dataFim">
            Data de fim
          </label>

          <input
            type="date"
            id="dataFim"
            name="dataFim"
            value={dataFim}
            onChange={(e) =>
              setDataFim(e.target.value)
            }
          />

        </div>

        <div>

          <label htmlFor="observacao">
            Observação
          </label>

          <textarea
            id="observacao"
            name="observacao"
            value={observacao}
            onChange={(e) =>
              setObservacao(e.target.value)
            }
          />

        </div>

        <button type="submit">
          Cadastrar autorização
        </button>

      </form>

      {mensagem && (
        <p>
          {mensagem}
        </p>
      )}

    </div>
  )
}

export default CadastroAutorizacaoSaida

