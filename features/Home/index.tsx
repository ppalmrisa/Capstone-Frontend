'use client';

import { Box, Button, Flex, LoadingOverlay, ScrollArea, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { apiGetJobList } from '@/api/home';
import { IGetJobList, IRequestList } from '@/types';

import HomeTable from './Table';

export default function HomeFeature() {
  const router = useRouter();
  const [data, setData] = useState<IRequestList<IGetJobList> | null>(null);
  const [visible, { open, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    open();
    onGetJobList();
  }, []);

  const onGetJobList = async () => {
    try {
      const res = await apiGetJobList({ page: 1, pageSize: 10 });
      setData(res.data);
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

  return (
    <Box>
      <Flex justify="space-between" align="center" mb="md">
        <Text size="32px" fw="bold" mb="md">
          Job List<Text size="md" span>{` (Total: ${data?.data?.length})`}</Text>
        </Text>
        <Button onClick={handleClickCreate}>Create Job</Button>
      </Flex>
      <ScrollArea h={500} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} type="always">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        {data && <HomeTable data={data} scrolled={scrolled} />}
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
