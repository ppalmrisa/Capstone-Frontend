'use client';

import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Flex,
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

  const cards = job?.results?.map((image, index) => (
    <Card
      key={`${index}.${image}`}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={image} />
      </AspectRatio>
    </Card>
  ));

  let statusColor = 'gray';
  switch (job?.status) {
    case 'working':
      statusColor = 'blue';
      break;
    case 'failed':
      statusColor = 'red';
      break;
    case 'done':
      statusColor = 'green';
      break;
    case 'waiting':
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
      <Flex justify="space-between" align="center">
        <Text size="32px" fw="bold" mb="md">
          Job Detail
        </Text>
        <Button onClick={() => router.push(`/edit/${id}`)} size="compact-md">
          Edit Job
        </Button>
      </Flex>
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
                Job Name : <Text span>{job?.camera}</Text>
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
                Description : <Text span>{job?.description || '-'}</Text>
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
