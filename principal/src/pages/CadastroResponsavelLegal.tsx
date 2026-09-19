
import { useEffect, useState } from 'react'
import './CadastroResponsavelLegal.css'

interface Estudante {
  idAluno: number
  nomeCompleto: string
}

function CadastroResponsavelLegal() {

  const [estudantes, setEstudantes] = useState<Estudante[]>([])

  const [idAluno, setIdAluno] = useState('')
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [cpf, setCpf] = useState('')
  const [grauParentesco, setGrauParentesco] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [enderecoCompleto, setEnderecoCompleto] = useState('')

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
      'Cadastrando responsável legal...'
    )

    try {

      const resposta = await fetch(
        'http://localhost:8080/responsaveis-legais',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            idAluno: Number(idAluno),

            nomeCompleto,

            cpf: cpf || null,

            grauParentesco,

            telefone:
              telefone || null,

            email:
              email || null,

            enderecoCompleto:
              enderecoCompleto || null
          })
        }
      )

      if (!resposta.ok) {

        throw new Error(
          'Erro ao cadastrar responsável legal.'
        )
      }

      const responsavel =
        await resposta.json()

      console.log(
        'Responsável cadastrado:',
        responsavel
      )

      setMensagem(
        `Responsável cadastrado com sucesso! ID: ${responsavel.idResponsavel}`
      )

      setIdAluno('')
      setNomeCompleto('')
      setCpf('')
      setGrauParentesco('')
      setTelefone('')
      setEmail('')
      setEnderecoCompleto('')

    } catch (error) {

      console.error(error)

      setMensagem(
        'Não foi possível cadastrar o responsável legal.'
      )
    }
  }

  return (
    <div className="cadastro-responsavel-container">

      <h1>
        Cadastro de Responsável Legal
      </h1>

      <p>
        Preencha os dados do responsável legal.
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

          <label htmlFor="nomeCompleto">
            Nome completo
          </label>

          <input
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            value={nomeCompleto}
            onChange={(e) =>
              setNomeCompleto(e.target.value)
            }
            maxLength={150}
            required
          />

        </div>

        <div>

          <label htmlFor="cpf">
            CPF
          </label>

          <input
            type="text"
            id="cpf"
            name="cpf"
            value={cpf}
            onChange={(e) =>
              setCpf(e.target.value)
            }
            maxLength={11}
            inputMode="numeric"
          />

        </div>

        <div>

          <label htmlFor="grauParentesco">
            Grau de parentesco
          </label>

          <select
            id="grauParentesco"
            name="grauParentesco"
            value={grauParentesco}
            onChange={(e) =>
              setGrauParentesco(
                e.target.value
              )
            }
            required
          >

            <option value="">
              Selecione
            </option>

            <option value="Mãe">
              Mãe
            </option>

            <option value="Pai">
              Pai
            </option>

            <option value="Avó">
              Avó
            </option>

            <option value="Avô">
              Avô
            </option>

            <option value="Responsável legal">
              Responsável legal
            </option>

            <option value="Outro">
              Outro
            </option>

          </select>

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
          />

        </div>

        <div>

          <label htmlFor="email">
            E-mail
          </label>

          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            maxLength={150}
          />

        </div>

        <div>

          <label htmlFor="enderecoCompleto">
            Endereço completo
          </label>

          <input
            type="text"
            id="enderecoCompleto"
            name="enderecoCompleto"
            value={enderecoCompleto}
            onChange={(e) =>
              setEnderecoCompleto(
                e.target.value
              )
            }
            maxLength={250}
          />

        </div>

        <button type="submit">
          Cadastrar responsável
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

export default CadastroResponsavelLegal

