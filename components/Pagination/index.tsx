import { ActionIcon, Button, Flex, Menu, Text } from '@mantine/core';
import { IconChevronDown, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';

import { useQueryParams } from '@/utils';

import classes from './styles.module.css';

interface IPagination {
  total: number;
}

export default function Pagination({ total }: IPagination) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { setQueryParams } = useQueryParams();
  const onClickChangePage = (type: 'prev' | 'next' | 'first' | 'last') => {
    switch (type) {
      case 'prev':
        setQueryParams({ page: page - 1 });
        break;
      case 'next':
        setQueryParams({ page: page + 1 });
        break;
      case 'first':
        setQueryParams({ page: 1 });
        break;
      default:
        break;
    }
  };

  const disabledButton = (type: 'prev' | 'next' | 'first' | 'last') => {
    switch (type) {
      case 'prev':
        return page === 1;
      // case 'next':
      //   return page === lastPage;
      case 'first':
        return page === 1;
      // case 'last':
      //   return page === lastPage;
    }
  };

  const onChangeLimit = (limit: number) => {
    setQueryParams({ page_limit: limit });
  };

  return (
    <Flex justify="end" c="gray-text" gap="md" align="center">
      <Menu shadow="md">
        <Menu.Target>
          <Button variant="transparent">
            <Flex align="center" c="gray-text.4">
              <Text mr="xs">{`Rows per page: ${total}`}</Text>
              <IconChevronDown />
            </Flex>
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => onChangeLimit(10)}>10</Menu.Item>
          <Menu.Item onClick={() => onChangeLimit(20)}>20</Menu.Item>
          <Menu.Item onClick={() => onChangeLimit(50)}>50</Menu.Item>
          <Menu.Item onClick={() => onChangeLimit(100)}>100</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ActionIcon
        radius="lg"
        variant="subtle"
        onClick={() => onClickChangePage('prev')}
        disabled={disabledButton('prev')}
        className={classes['action-icon-button']}
      >
        <IconChevronLeft style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
      <ActionIcon
        variant="subtle"
        radius="lg"
        onClick={() => onClickChangePage('next')}
        disabled={disabledButton('next')}
        className={classes['action-icon-button']}
      >
        <IconChevronRight style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
    </Flex>
  );
}
