
import { useEffect, useState } from 'react'
import './CadastroContatoEmergencia.css'

interface Estudante {
  idAluno: number
  nomeCompleto: string
}

function CadastroContatoEmergencia() {

  const [estudantes, setEstudantes] = useState<Estudante[]>([])

  const [idAluno, setIdAluno] = useState('')
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [grauParentesco, setGrauParentesco] = useState('')
  const [ordemContato, setOrdemContato] = useState('')

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
      'Cadastrando contato de emergência...'
    )

    try {

      const resposta = await fetch(
        'http://localhost:8080/contatos-emergencia',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            idAluno: Number(idAluno),

            nome,

            telefone,

            grauParentesco:
              grauParentesco || null,

            ordemContato:
              Number(ordemContato)

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
          'Erro ao cadastrar contato de emergência.'
        )
      }

      const contato =
        await resposta.json()

      console.log(
        'Contato cadastrado:',
        contato
      )

      setMensagem(
        `Contato cadastrado com sucesso! ID: ${contato.idContatoEmergencia}`
      )

      setIdAluno('')
      setNome('')
      setTelefone('')
      setGrauParentesco('')
      setOrdemContato('')

    } catch (error) {

      console.error(error)

      setMensagem(
        'Não foi possível cadastrar o contato de emergência.'
      )
    }
  }

  return (
    <div className="cadastro-contato-container">

      <h1>
        Cadastro de Contato de Emergência
      </h1>

      <p>
        Preencha os dados do contato de emergência.
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

          <label htmlFor="telefone">
            Telefone
          </label>

          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={telefone}
            onChange={(e) =>
              setTelefone(e.target.value)
            }
            maxLength={20}
            required
          />

        </div>

        <div>

          <label htmlFor="grauParentesco">
            Grau de parentesco
          </label>

          <input
            type="text"
            id="grauParentesco"
            name="grauParentesco"
            value={grauParentesco}
            onChange={(e) =>
              setGrauParentesco(
                e.target.value
              )
            }
            maxLength={50}
          />

        </div>

        <div>

          <label htmlFor="ordemContato">
            Ordem do contato
          </label>

          <input
            type="number"
            id="ordemContato"
            name="ordemContato"
            value={ordemContato}
            onChange={(e) =>
              setOrdemContato(
                e.target.value
              )
            }
            min={1}
            required
          />

        </div>

        <button type="submit">
          Cadastrar contato
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

export default CadastroContatoEmergencia

