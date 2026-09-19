import type { Comentario } from '../types/post'

import Comentarios from './Comentarios'

import Avatar from './Avatar'

interface PostProps {
  id: number
  autor: string
  imagem: string
  comentario: string
  data: string
  curtidas: number
  curtido: boolean
  comentarios: Comentario[]
  onCurtir: (id: number) => void
  onAdicionarComentario: (
    postId: number,
    texto: string
  ) => void
}

function Post({
  id,
  autor,
  imagem,
  comentario,
  data,
  curtidas,
  curtido,
  comentarios,
  onCurtir,
  onAdicionarComentario
}: PostProps) {

  return (
    <article className="post">

      <div className="post-cabecalho">

        <Avatar nome={autor} />

        <div className="post-data">
          {data}
        </div>

      </div>

      <img
        className="post-imagem"
        src={imagem}
        alt={`Foto publicada por ${autor}`}
      />

      <div className="post-acoes">

        <button
          className={`botao-curtir ${curtido ? 'curtido' : ''}`}
          onClick={() => onCurtir(id)}
        >
          {curtido ? '❤️ Curtido' : '♡ Curtir'}
        </button>

      </div>

      <div className="post-conteudo">

        <strong>
          {curtidas} curtida{curtidas !== 1 ? 's' : ''}
        </strong>

        <p>
          <strong>{autor}</strong>{' '}
          {comentario}
        </p>

      </div>

      <Comentarios
        postId={id}
        comentarios={comentarios}
        onAdicionarComentario={onAdicionarComentario}
      />

    </article>
  )
}

export default Post