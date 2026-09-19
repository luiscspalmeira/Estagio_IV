import { useState } from 'react'

function Contraste() {

  const [altoContraste, setAltoContraste] = useState(false)

  function alternarContraste() {

    setAltoContraste((estadoAtual) => {
      const novoEstado = !estadoAtual

      document.body.classList.toggle(
        'alto-contraste',
        novoEstado
      )

      return novoEstado
    })
  }

  return (
    <button
      type="button"
      className="botao-contraste"
      onClick={alternarContraste}
      aria-pressed={altoContraste}
      aria-label={
        altoContraste
          ? 'Desativar alto contraste'
          : 'Ativar alto contraste'
      }
    >
      {altoContraste
        ? '☀️'
        : '◐'}
    </button>
  )
}

export default Contraste