interface AvatarProps {
  nome: string
}

function Avatar({ nome }: AvatarProps) {

  return (
    <div className="avatar">

      <div className="avatar-imagem">
        👤
      </div>

      <span className="avatar-nome">
        {nome}
      </span>

    </div>
  )
}

export default Avatar