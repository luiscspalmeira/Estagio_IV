import { useEffect, useState } from 'react'

import PostComponent from '../components/Post'
import PostForm from '../components/PostForm'
import type { Comentario, Post } from '../types/post'

function Fotos() {

  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {

    const postsSalvos = localStorage.getItem('posts')

    if (postsSalvos) {
      setPosts(JSON.parse(postsSalvos))
    }

  }, [])

  function publicar(
  nome: string,
  imagem: string,
  comentario: string
) {

    const novoPost: Post = {
      id: Date.now(),
      autor: nome,
      imagem: imagem,
      comentario: comentario,
      data: new Date().toLocaleString('pt-BR'),
      curtidas: 0,
      curtido: false,
      comentarios: []
    }

    const novosPosts = [
      novoPost,
      ...posts
    ]

    setPosts(novosPosts)

    localStorage.setItem(
      'posts',
      JSON.stringify(novosPosts)
    )
  }

  function alternarCurtida(id: number) {

  const novosPosts = posts.map((post) => {

    if (post.id === id) {

      if (post.curtido) {

        return {
          ...post,
          curtidas: post.curtidas - 1,
          curtido: false
        }

      }

      return {
        ...post,
        curtidas: post.curtidas + 1,
        curtido: true
      }
    }

    return post

  })

  setPosts(novosPosts)

  localStorage.setItem(
    'posts',
    JSON.stringify(novosPosts)
  )
}


function adicionarComentario(
  postId: number,
  nome: string,
  texto: string
) {

  const novosPosts = posts.map((post) => {

    if (post.id === postId) {

      const novoComentario: Comentario = {
  id: Date.now(),
  autor: nome,
  texto: texto,
  data: new Date().toLocaleString('pt-BR')
}

      return {
        ...post,
        comentarios: [
          ...post.comentarios,
          novoComentario
        ]
      }
    }

    return post

  })

  setPosts(novosPosts)

  localStorage.setItem(
    'posts',
    JSON.stringify(novosPosts)
  )
}

  return (
    <div className="pagina-fotos">

      <PostForm
        onPublicar={publicar}
      />

      <div className="feed">

        <h2>Publicações</h2>

        {posts.length === 0 && (
          <p>
            Ainda não existem publicações.
          </p>
        )}

        {posts.map((post) => (

          <PostComponent
            key={post.id}
            id={post.id}
            autor={post.autor}
            imagem={post.imagem}
            comentario={post.comentario}
            data={post.data}
            curtidas={post.curtidas}
            curtido={post.curtido}
            onCurtir={alternarCurtida}
            comentarios={post.comentarios}
            onAdicionarComentario={adicionarComentario}
          />

        ))}

      </div>

    </div>
  )
}

export default Fotos