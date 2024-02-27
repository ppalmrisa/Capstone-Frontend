'use client';

import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Grid,
  Image,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { apiGetJobDetail } from '@/api/home';
import { IGetJobList } from '@/types';

import classes from './styles.module.css';

const mockData = [
  {
    title: 'Top 10 places to visit in Norway this summer',
    image:
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 18, 2022',
  },
  {
    title: 'Best forests to visit in North America',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'August 27, 2022',
  },
  {
    title: 'Hawaii beaches review: better than you think',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 9, 2022',
  },
  {
    title: 'Mountains at night: 12 best locations to enjoy the view',
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
    date: 'September 12, 2022',
  },
];

export default function DetailFeature() {
  const router = useRouter();
  const { id } = useParams();
  const [job, setJobs] = useState<IGetJobList | null>(null);
  const [visible, { open, close }] = useDisclosure(false);

  useEffect(() => {
    open();
    onGetJobDetail();
  }, []);

  const onGetJobDetail = async () => {
    try {
      const res = await apiGetJobDetail(id as string);
      setJobs(res?.data[0]);
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

  const cards = mockData.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  let statusColor = 'gray';
  switch (job?.status) {
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
    <Box>
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Button
        size="compact-sm"
        onClick={() => router.back()}
        leftSection={<IconArrowLeft />}
        variant="outline"
        mb="sm"
      >
        Back
      </Button>
      <Text size="32px" fw="bold" mb="md">
        Job Detail
      </Text>
      <Grid w={{ base: '100%', md: '900px' }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md" h="100%">
            <Stack gap="md">
              <Text fw="bold" span>
                ID : <Text span>{id}</Text>
              </Text>
              <Text fw="bold" span>
                Job Name : <Text span>{job?.jobName}</Text>
              </Text>
              <Text fw="bold" span>
                Status :{' '}
                <Badge variant="light" radius="md" color={statusColor} w={80}>
                  {job?.status}
                </Badge>
              </Text>
              <Text fw="bold" span>
                Start Time :{' '}
                <Text span>{dayjs(job?.jobPeriodStart).format('D MMM YYYY HH:mm')}</Text>
              </Text>
              <Text fw="bold" span>
                End Time : <Text span>{dayjs(job?.jobPeriodEnd).format('D MMM YYYY HH:mm')}</Text>
              </Text>
              <Text fw="bold" span>
                Description : <Text span>-</Text>
              </Text>
            </Stack>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder p="md" h="600px" className={classes['container-card']}>
            <SimpleGrid cols={1}>{cards}</SimpleGrid>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
