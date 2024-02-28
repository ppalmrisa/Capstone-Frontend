'use client';

import { Box, Button, Flex, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

import { CameraIcon } from '@/assets';

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
          <Flex align="center" style={{ cursor: 'pointer' }} onClick={() => router.push('/home')}>
            <CameraIcon width={50} height={50} />
            <Flex direction="column" ml={4}>
              <Title c="blue" order={6} lh={1}>
                Capstone
              </Title>
              <Text c="blue" size="10px">
                Project
              </Text>
            </Flex>
          </Flex>
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
