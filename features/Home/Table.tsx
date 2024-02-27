import { Anchor, Badge, Box, Button, Menu, Table, Text, rem } from '@mantine/core';
import { IconDotsVertical, IconFileSearch, IconTrash } from '@tabler/icons-react';
import cx from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import Pagination from '@/components/Pagination';
import { IGetJobList, IRequestList } from '@/types';

import classes from './styles.module.css';

interface IHomeTable {
  data: IRequestList<IGetJobList>;
  scrolled: boolean;
}

export default function HomeTable({ data, scrolled }: IHomeTable) {
  const { data: jobs, totalCount } = data;
  const router = useRouter();

  const handleClickDetail = (id: string) => router.push(`/detail/${id}`);

  const rows =
    jobs &&
    jobs.map((row, index) => {
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
      <Table verticalSpacing="xs" w={600}>
        <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <Table.Tr>
            <Table.Th>No.</Table.Th>
            <Table.Th>Job Name</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Start date</Table.Th>
            <Table.Th>End date</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Pagination total={totalCount} />
    </Box>
  );
}
