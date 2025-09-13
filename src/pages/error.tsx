import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/ui/button'

export function Error() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background-primary">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-accent-purple">Erro</h1>
        <h2 className="mt-4 text-2xl font-semibold text-base-gray-100">
          Algo deu errado
        </h2>
        <p className="mt-2 text-sm text-base-gray-400">
          Ocorreu um erro inesperado. Tente novamente mais tarde.
        </p>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => navigate('/')} className="px-8">
          Voltar ao início
        </Button>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="px-8"
        >
          Recarregar página
        </Button>
      </div>
    </div>
  )
}
