import { AuthForm } from '@/components/auth/auth-form';

export const metadata = {
  title: 'Login | Escape2Taste'
};

export default function LoginPage() {
  return <AuthForm mode='login' />;
}
