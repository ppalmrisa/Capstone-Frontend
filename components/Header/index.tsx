'use client';

import { Box, Button, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

import classes from './styles.module.css';

const CAPSTONE_SESSION_TOKEN = process.env.CAPSTONE_SESSION_TOKEN || 'capstone-session-token';

export function HeaderMegaMenu() {
  const router = useRouter();
  const [, , removeCookie] = useCookies([CAPSTONE_SESSION_TOKEN]);

  const handleLogout = () => {
    removeCookie(CAPSTONE_SESSION_TOKEN);
    router.push('/login');
  };

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />
          <Group>
            <Button size="compact-md" onClick={handleLogout}>
              Log Out
            </Button>
          </Group>
        </Group>
      </header>
    </Box>
  );
}
