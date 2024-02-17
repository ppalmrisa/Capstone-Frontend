import { Box, Center, Container } from '@mantine/core';
import { HeaderMegaMenu } from '../Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <HeaderMegaMenu />
      <Container size="responsive" h="calc(100vh - 60px)">
        <Center h="100%">{children}</Center>
      </Container>
    </Box>
  );
}
