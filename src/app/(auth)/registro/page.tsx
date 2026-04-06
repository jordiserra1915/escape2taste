import { AuthForm } from '@/components/auth/auth-form';

export const metadata = {
  title: 'Registro | Escape2Taste'
};

export default function RegisterPage() {
  return <AuthForm mode='register' />;
}
