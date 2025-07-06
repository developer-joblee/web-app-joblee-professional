import { Home } from '@/pages/Home/Home';
import { RegisterDone } from '@/pages/Onboard/RegisterDone';
import { Calendar } from '@/pages/Calendar/Calendar';
import { Wallet } from '@/pages/Wallet/Wallet';

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
    name: 'Wallet',
    path: '/wallet',
    component: Wallet,
  },
  {
    name: 'RegisterDone',
    path: '/register-done',
    component: RegisterDone,
  },
];
