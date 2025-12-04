
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

// Schema de validación
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo es requerido')
    .email('Formato de correo inválido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implementar llamada al backend
      console.log('Login attempt:', data);
      
      // Simulación de login (reemplazar con API real)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Redirigir al dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Alerta de error */}
      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}

      {/* Campo de Email/Usuario */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium">
          Usuario o Correo Electrónico
        </Label>
        <Input
          id="email"
          type="text"
          placeholder="usuario@spe.gov.co"
          {...register('email')}
          disabled={isLoading}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Campo de Contraseña */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700 font-medium">
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register('password')}
          disabled={isLoading}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Botón de Ingresar */}
      <Button
        type="submit"
        className="w-full text-white font-bold"
        style={{ backgroundColor: '#0033ff' }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Ingresando...
          </>
        ) : (
          'INGRESAR'
        )}
      </Button>

      {/* Link de recuperación */}
      <div className="text-center pt-2">
        <RecoverPasswordDialog />
      </div>
    </form>
  );
}

// Diálogo de recuperación de contraseña
function RecoverPasswordDialog() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implementar recuperación de contraseña
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      console.error('Error al recuperar contraseña:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-sm hover:underline transition-colors"
          style={{ color: '#01033e' }}
        >
          ¿Olvidó su contraseña?
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle style={{ color: '#01033e' }}>
            Recuperar Contraseña
          </DialogTitle>
          <DialogDescription>
            Ingrese su correo electrónico y le enviaremos instrucciones para
            restablecer su contraseña.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="space-y-4">
            <Alert>
              Se han enviado las instrucciones a su correo electrónico.
            </Alert>
            <Button
              onClick={() => setSuccess(false)}
              className="w-full"
              variant="outline"
            >
              Cerrar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleRecover} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recover-email">Correo Electrónico</Label>
              <Input
                id="recover-email"
                type="email"
                placeholder="usuario@spe.gov.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1"
                style={{ backgroundColor: '#0033ff' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Instrucciones'
                )}
              </Button>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" className="flex-1">
                  Cancelar
                </Button>
              </DialogTrigger>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
