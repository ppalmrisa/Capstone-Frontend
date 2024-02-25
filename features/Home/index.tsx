'use client';

import {
  Anchor,
  Badge,
  Box,
  Button,
  Flex,
  LoadingOverlay,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconSquareArrowRight } from '@tabler/icons-react';
import cx from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { apiGetJobList } from '@/api/home';
import { IGetJobList } from '@/types';

import classes from './styles.module.css';

export default function HomeFeature() {
  const router = useRouter();
  const [jobs, setJobs] = useState<IGetJobList[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [visible, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
    onGetJobList();
  }, []);

  const onGetJobList = async () => {
    try {
      const res = await apiGetJobList();
      setJobs(res?.data);
      close();
    } catch (error: any) {
      close();
      const message = error?.response?.data?.message;
      notifications.show({
        title: error?.message,
        message: `${error?.code} : ${message}`,
        color: 'red',
      });
    }
  };

  const handleClickCreate = () => router.push('/create');

  const handleClickDetail = (id: string) => router.push(`/detail/${id}`);

  const rows = jobs.map((row, index) => {
    let statusColor = 'gray';
    switch (row.status) {
      case 'working':
        statusColor = 'green';
        break;
      case 'failed':
        statusColor = 'red';
        break;
      case 'running':
        statusColor = 'yellow';
        break;
      default:
        break;
    }
    return (
      <Table.Tr key={row.id}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.jobName}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Badge color={statusColor} radius="xs">
            {row.status}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Text w={130} size="sm">
            {dayjs(row.jobPeriodStart).format('D MMM YYYY HH:mm')}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text w={130} size="sm">
            {dayjs(row.jobPeriodEnd).format('D MMM YYYY HH:mm')}
          </Text>
        </Table.Td>
        <Table.Td>
          <Button variant="white" onClick={() => handleClickDetail(row.id)}>
            <IconSquareArrowRight />
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Box>
      <Flex justify="space-between" align="center" mb="md">
        <Text size="32px" fw="bold" mb="md">
          Job List<Text size="md" span>{` (Total: ${rows.length})`}</Text>
        </Text>
        <Button onClick={handleClickCreate}>Create Job</Button>
      </Flex>
      <ScrollArea h={500} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} type="always">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        <Table verticalSpacing="xs">
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>No.</Table.Th>
              <Table.Th>Job</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Start date</Table.Th>
              <Table.Th>End date</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Box>
  );
}
