import { Box, Center, Container } from '@mantine/core';

import { HeaderMegaMenu } from '../Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <HeaderMegaMenu />
      <Container size="responsive" h="calc(100vh - 60px)">
        <Center pt="xl">{children}</Center>
      </Container>
    </Box>
  );
}
