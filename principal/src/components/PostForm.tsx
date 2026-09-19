import { useState } from 'react'

interface PostFormProps {
  onPublicar: (
    nome: string,
    imagem: string,
    comentario: string
  ) => void
}

function PostForm({ onPublicar }: PostFormProps) {

  const [imagem, setImagem] = useState<string | null>(null)

  const [comentario, setComentario] = useState('')

  const [nome, setNome] = useState('')

  function selecionarImagem(
    evento: React.ChangeEvent<HTMLInputElement>
  ) {

    const arquivo = evento.target.files?.[0]

    if (!arquivo) {
      return
    }

    const leitor = new FileReader()

    leitor.onload = () => {

      if (typeof leitor.result === 'string') {
        setImagem(leitor.result)
      }

    }

    leitor.readAsDataURL(arquivo)
  }

  function publicar() {

  if (!nome.trim()) {
    alert('Digite seu nome.')
    return
  }

  if (!imagem) {
    alert('Escolha uma foto.')
    return
  }

  if (!comentario.trim()) {
    alert('Digite um comentário.')
    return
  }

  onPublicar(
    nome,
    imagem,
    comentario
  )

  setNome('')
  setImagem('')
  setComentario('')
}

  return (

    

    <div className="formulario-post">

      <h1>Publicar foto</h1>

      <div className="campo-nome">

    <label htmlFor="nome">
      Seu nome
    </label>

    <input
      id="nome"
      type="text"
      value={nome}
      onChange={(evento) =>
        setNome(evento.target.value)
      }
      placeholder="Ex.: Luis Palmeira"
    />

  </div>

      <p>
        Escolha uma foto e escreva um comentário.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={selecionarImagem}
      />

      {imagem && (
        <div className="preview">

          <h2>Prévia da foto</h2>

          <img
            src={imagem}
            alt="Prévia da foto selecionada"
          />

        </div>
      )}

      <div className="campo-comentario">

        <label htmlFor="comentario">
          Comentário
        </label>

        <textarea
          id="comentario"
          value={comentario}
          onChange={(evento) =>
            setComentario(evento.target.value)
          }
          placeholder="Escreva seu comentário..."
        />

      </div>

      <button
        className="botao-publicar"
        onClick={publicar}
      >
        Publicar
      </button>

    </div>
  )
}

export default PostForm