import { AppSidebar } from '@/components/ui/app-sidebar';
import {
  Button,
  CloseButton,
  Drawer,
  Flex,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { TobBarMenu } from '@/components/ui/tob-bar-menu';
import { useEffect, useState } from 'react';
import { ResponsiveNavMenu } from '@/components/ui/responsive-nav-menu';
import { type TabsProps } from '../components/ui/responsive-nav-menu';
import { Profile } from '@/pages/Profile/Profile';

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
  const [openedDrawer, setOpenedDrawer] = useState(false);
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
    <>
      <Stack justifyContent="space-between" height="100vh">
        <TobBarMenu onOpenMenu={() => setOpened(!opened)}>
          {children}
        </TobBarMenu>
        <ResponsiveNavMenu
          currentTab={currentTab}
          onChangeTab={(tab) => {
            if (tab === 'profile') {
              setOpenedDrawer(true);
              return;
            }

            setCurrentTab(tab);
          }}
        />
      </Stack>

      <Drawer.Root size="full" open={openedDrawer}>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Drawer Title</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Profile />
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Drawer.ActionTrigger>
                <Button>Save</Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" onClick={() => setOpenedDrawer(false)} />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};
