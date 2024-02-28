'use client';

import { Box, Button, Flex, LoadingOverlay, ScrollArea, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { apiGetJobList } from '@/api/home';
import Pagination from '@/components/Pagination';
import { IGetJobList, IRequestList } from '@/types';
import { useQueryParams } from '@/utils';

import HomeTable from './Table';

export default function HomeFeature() {
  const router = useRouter();
  const [data, setData] = useState<IRequestList<IGetJobList> | null>(null);
  const [visible, { open, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);
  const { setQueryParams } = useQueryParams();
  // params
  const searchParams = useSearchParams();
  const jobName = searchParams.get('jobName');
  const page = Number(searchParams.get('page'));
  const pageSize = Number(searchParams.get('pageSize'));

  useEffect(() => {
    setQueryParams({
      ...(!jobName ? { jobName } : {}),
      ...(!page ? { page: 1 } : {}),
      ...(!pageSize ? { pageSize: 10 } : {}),
    });
    open();
    onGetJobList();
  }, [jobName, page, pageSize]);

  const onGetJobList = async () => {
    try {
      const res = await apiGetJobList({ page, pageSize, jobName: jobName || '' });
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
      <ScrollArea h={620} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} type="always">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        {data && <HomeTable data={data} scrolled={scrolled} />}
      </ScrollArea>
      <Pagination total={data?.totalCount || 0} />
    </Box>
  );
}
