
import { useEffect, useState } from 'react'
import './CadastroAcompanhanteAutorizado.css'

interface Estudante {
  idAluno: number
  nomeCompleto: string
}

function CadastroAcompanhanteAutorizado() {

  const [estudantes, setEstudantes] = useState<Estudante[]>([])

  const [idAluno, setIdAluno] = useState('')
  const [nome, setNome] = useState('')
  const [rg, setRg] = useState('')
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
      'Cadastrando acompanhante autorizado...'
    )

    try {

      const resposta = await fetch(
        'http://localhost:8080/acompanhantes-autorizados',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            idAluno: Number(idAluno),

            nome,

            rg: rg || null,

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
          'Erro ao cadastrar acompanhante autorizado.'
        )
      }

      const acompanhante =
        await resposta.json()

      console.log(
        'Acompanhante cadastrado:',
        acompanhante
      )

      setMensagem(
        `Acompanhante cadastrado com sucesso! ID: ${acompanhante.idAcompanhante}`
      )

      setIdAluno('')
      setNome('')
      setRg('')
      setObservacao('')

    } catch (error) {

      console.error(error)

      setMensagem(
        'Não foi possível cadastrar o acompanhante autorizado.'
      )
    }
  }

  return (
    <div className="cadastro-acompanhante-container">

      <h1>
        Cadastro de Acompanhante Autorizado
      </h1>

      <p>
        Preencha os dados do acompanhante autorizado.
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

          <label htmlFor="nome">
            Nome
          </label>

          <input
            type="text"
            id="nome"
            name="nome"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
            maxLength={150}
            required
          />

        </div>

        <div>

          <label htmlFor="rg">
            RG
          </label>

          <input
            type="text"
            id="rg"
            name="rg"
            value={rg}
            onChange={(e) =>
              setRg(e.target.value)
            }
            maxLength={30}
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
          Cadastrar acompanhante
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

export default CadastroAcompanhanteAutorizado

