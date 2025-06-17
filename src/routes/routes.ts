import { Home } from '@/pages/Home/Home';
import { RegisterDone } from '@/pages/Onboard/RegisterDone';

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'RegisterDone',
    path: '/register-done',
    component: RegisterDone,
  },
];
