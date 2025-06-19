// import { Stack } from '@chakra-ui/react';
// import { ResponsiveNavMenu } from '../components/ui/responsive-nav-menu';
// import { type TabsProps } from '../components/ui/responsive-nav-menu';
// import { useState } from 'react';
// import { Sidebar } from '@/components/ui/side-bar';

import { AppSidebar } from '@/components/ui/app-sidebar';
import { Flex, Stack } from '@chakra-ui/react';
import { TobBarMenu } from '@/components/ui/tob-bar-menu';
import { useEffect, useState } from 'react';
import { ResponsiveNavMenu } from '@/components/ui/responsive-nav-menu';
import { type TabsProps } from '../components/ui/responsive-nav-menu';

// export const Layout = ({ children }: { children: React.ReactNode }) => {
//   const [currentTab, setCurrentTab] = useState<TabsProps>('home');

//   return (
//     <>
//       {/* <Stack justifyContent="space-between" height="100%">
//         <Sidebar /> */}
//       {children}
//       {/* <ResponsiveNavMenu
//           currentTab={currentTab}
//           onChangeTab={setCurrentTab}
//         />
//       </Stack> */}
//     </>
//   );
// };

const useMediaQuery = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isDesktop;
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabsProps>('home');
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return (
      <Flex width="100%">
        <AppSidebar opened={opened} />
        <TobBarMenu onOpenMenu={() => setOpened(!opened)}>
          {children}
        </TobBarMenu>
      </Flex>
    );
  }

  return (
    <Stack justifyContent="space-between" height="100vh">
      <TobBarMenu onOpenMenu={() => setOpened(!opened)}>{children}</TobBarMenu>
      <ResponsiveNavMenu currentTab={currentTab} onChangeTab={setCurrentTab} />
    </Stack>
  );
};
