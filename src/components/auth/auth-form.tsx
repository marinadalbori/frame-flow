import * as React from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/ui/icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'login' | 'register'
}

export function AuthForm({ type, className, ...props }: AuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  
  const supabase = createClient()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as string

    try {
      if (type === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/')
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: \`\${window.location.origin}/auth/callback\`,
            data: {
              role,
            },
          },
        })
        if (error) throw error
        router.push('/login?message=Controlla la tua email per verificare l\'account')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Si è verificato un errore')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{type === 'login' ? 'Accedi' : 'Registrati'}</CardTitle>
        <CardDescription>
          {type === 'login'
            ? 'Inserisci le tue credenziali per accedere'
            : 'Crea un nuovo account'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nome@esempio.it"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
          {type === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="role">Ruolo</Label>
              <Select name="role" required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona un ruolo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supplier">Fornitore</SelectItem>
                  <SelectItem value="installer">Installatore</SelectItem>
                  <SelectItem value="client">Cliente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type === 'login' ? 'Accedi' : 'Registrati'}
          </Button>
          {type === 'login' ? (
            <p className="text-sm text-center">
              Non hai un account?{' '}
              <a href="/register" className="text-primary hover:underline">
                Registrati
              </a>
            </p>
          ) : (
            <p className="text-sm text-center">
              Hai già un account?{' '}
              <a href="/login" className="text-primary hover:underline">
                Accedi
              </a>
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
