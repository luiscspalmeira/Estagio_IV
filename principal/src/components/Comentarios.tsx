import { useState } from 'react'

import type { Comentario } from '../types/post'

import Avatar from './Avatar'

interface ComentariosProps {
  postId: number
  comentarios: Comentario[]
  onAdicionarComentario: (
  postId: number,
  nome: string,
  texto: string
) => void
}

function Comentarios({
  postId,
  comentarios,
  onAdicionarComentario
}: ComentariosProps) {

    const [nome, setNome] = useState('')
  const [novoComentario, setNovoComentario] = useState('')

  function enviarComentario() {

  if (!nome.trim()) {
    alert('Digite seu nome.')
    return
  }

  if (!novoComentario.trim()) {
    alert('Digite um comentário.')
    return
  }

  onAdicionarComentario(
    postId,
    nome,
    novoComentario
  )

  setNome('')
  setNovoComentario('')
}

  return (
    <>

        <div className="campo-comentario-nome">

  <input
    type="text"
    value={nome}
    onChange={(evento) =>
      setNome(evento.target.value)
    }
    placeholder="Seu nome"
  />

</div>
      <div className="comentarios">

        {comentarios.map((comentario) => (

        <div
            className="comentario"
            key={comentario.id}
        >

            <Avatar nome={comentario.autor} />

            <span className="comentario-texto">
                {comentario.texto}
            </span>

        </div>

        ))}

      </div>

      <div className="novo-comentario">

        <input
          type="text"
          value={novoComentario}
          onChange={(evento) =>
            setNovoComentario(evento.target.value)
          }
          placeholder="Escreva um comentário..."
        />

        <button onClick={enviarComentario}>
          Comentar
        </button>

      </div>
    </>
  )
}

export default Comentarios