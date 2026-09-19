export interface Comentario {
  id: number
  autor: string
  texto: string
  data: string
}

export interface Post {
  id: number
  autor: string
  imagem: string
  comentario: string
  data: string
  curtidas: number
  curtido: boolean
  comentarios: Comentario[]
}