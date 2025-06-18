import { Stack } from '@chakra-ui/react';
import { ResponsiveNavMenu } from '../components/ui/responsive-nav-menu';
import { type TabsProps } from '../components/ui/responsive-nav-menu';
import { useState } from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [currentTab, setCurrentTab] = useState<TabsProps>('home');

  return (
    <Stack justifyContent="space-between" height="100%">
      {children}
      <ResponsiveNavMenu currentTab={currentTab} onChangeTab={setCurrentTab} />
    </Stack>
  );
};
