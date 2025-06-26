import { Login } from '@/pages/Authentication/Login';
import { CodeVerify } from '@/pages/Authentication/CodeVerify';
import { Register } from '@/pages/Authentication/Register';
import { ForgotPassword } from '@/pages/Authentication/ForgotPassword';
import { Onboarding } from '@/pages/Onboarding/Onboarding';

export const publicRoutes = [
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Register',
    path: '/register',
    component: Register,
  },
  {
    name: 'ForgotPassword',
    path: '/forgot-password',
    component: ForgotPassword,
  },
  {
    name: 'CodeVerify',
    path: '/code-verify',
    component: CodeVerify,
  },
  {
    name: 'Onboarding',
    path: '/onboarding',
    component: Onboarding,
  },
];
