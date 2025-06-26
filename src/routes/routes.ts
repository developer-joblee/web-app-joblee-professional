import { Home } from '@/pages/Home/Home';
import { RegisterDone } from '@/pages/Onboard/RegisterDone';
import { Calendar } from '@/pages/Calendar/Calendar';

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Calendar',
    path: '/calendar',
    component: Calendar,
  },
  {
    name: 'RegisterDone',
    path: '/register-done',
    component: RegisterDone,
  },
];
