'use client';

import {
  Anchor,
  Badge,
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Menu,
  ScrollArea,
  Table,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDotsVertical, IconFileSearch, IconTrash } from '@tabler/icons-react';
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
        {jobs.length > 0 ? (
          <>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>
              <Anchor component="button" fz="sm">
                {row.jobName}
              </Anchor>
            </Table.Td>
            <Table.Td>
              <Badge variant="light" radius="md" color={statusColor} w={80}>
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
              <Menu shadow="md" radius="md">
                <Menu.Target>
                  <Button variant="transparent" radius="xl">
                    <IconDotsVertical />
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconFileSearch style={{ width: rem(14), height: rem(14) }} color="blue" />
                    }
                    onClick={() => handleClickDetail(row.id)}
                  >
                    View
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconTrash style={{ width: rem(14), height: rem(14) }} color="red" />
                    }
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Table.Td>
          </>
        ) : (
          <Table.Td>No Data</Table.Td>
        )}
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
        <Table verticalSpacing="xs" w={600}>
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

// const jobList: IGetJobList[] = [
//   {
//     id: '1',
//     jobName: 'Job 1',
//     status: 'waiting',
//     jobPeriodStart: '2023-01-01',
//     jobPeriodEnd: '2023-01-10',
//     camera: 'Camera 1',
//   },
//   {
//     id: '2',
//     jobName: 'Job 2',
//     status: 'running',
//     jobPeriodStart: '2023-02-01',
//     jobPeriodEnd: '2023-02-10',
//     camera: 'Camera 2',
//   },
//   {
//     id: '3',
//     jobName: 'Job 3',
//     status: 'working',
//     jobPeriodStart: '2023-03-01',
//     jobPeriodEnd: '2023-03-10',
//     camera: 'Camera 3',
//   },
//   {
//     id: '4',
//     jobName: 'Job 4',
//     status: 'failed',
//     jobPeriodStart: '2023-04-01',
//     jobPeriodEnd: '2023-04-10',
//     camera: 'Camera 4',
//   },
//   {
//     id: '5',
//     jobName: 'Job 5',
//     status: 'waiting',
//     jobPeriodStart: '2023-05-01',
//     jobPeriodEnd: '2023-05-10',
//     camera: 'Camera 5',
//   },
//   {
//     id: '6',
//     jobName: 'Job 6',
//     status: 'running',
//     jobPeriodStart: '2023-06-01',
//     jobPeriodEnd: '2023-06-10',
//     camera: 'Camera 6',
//   },
//   {
//     id: '7',
//     jobName: 'Job 7',
//     status: 'working',
//     jobPeriodStart: '2023-07-01',
//     jobPeriodEnd: '2023-07-10',
//     camera: 'Camera 7',
//   },
//   {
//     id: '8',
//     jobName: 'Job 8',
//     status: 'failed',
//     jobPeriodStart: '2023-08-01',
//     jobPeriodEnd: '2023-08-10',
//     camera: 'Camera 8',
//   },
//   {
//     id: '9',
//     jobName: 'Job 9',
//     status: 'waiting',
//     jobPeriodStart: '2023-09-01',
//     jobPeriodEnd: '2023-09-10',
//     camera: 'Camera 9',
//   },
//   {
//     id: '10',
//     jobName: 'Job 10',
//     status: 'running',
//     jobPeriodStart: '2023-10-01',
//     jobPeriodEnd: '2023-10-10',
//     camera: 'Camera 10',
//   },
// ];
