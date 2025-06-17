import { Login } from '@/pages/Authentication/Login';
import { CodeVerify } from '@/pages/Authentication/CodeVerify';
import { Register } from '@/pages/Authentication/Register';

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
    name: 'CodeVerify',
    path: '/code-verify',
    component: CodeVerify,
  },
];
