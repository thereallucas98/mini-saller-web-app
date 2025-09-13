import { useNavigate } from 'react-router-dom'

import { Button } from '~/components/ui/button'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-base-gray-100">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-base-gray-400">
          Página não encontrada
        </h2>
        <p className="mt-2 text-sm text-base-gray-400">
          A página que você está procurando não existe.
        </p>
      </div>
      <Button onClick={() => navigate('/')} className="px-8">
        Voltar ao início
      </Button>
    </div>
  )
}
