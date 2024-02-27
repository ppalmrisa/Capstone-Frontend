'use client';

import { Box, Button, Grid, Text, TextInput, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { apiCreateJob } from '@/api/home';
import { ICreateJob } from '@/types';

export default function CreateFeature() {
  const router = useRouter();
  const form = useForm<ICreateJob>({
    initialValues: {
      jobName: '',
      jobPeriodStart: dayjs().toDate(),
      jobPeriodEnd: dayjs().toDate(),
      camera: '',
      description: '',
    },
    validate: {
      jobName: (value) => (value.length < 3 ? 'Name must have at least 3 letters' : null),
      jobPeriodStart: (value) => (value ? null : 'Start Date is required'),
      jobPeriodEnd: (value) => (value ? null : 'Start Date is required'),
      description: (value) => (value ? null : 'Description is required'),
    },
  });

  const onSubmit = async (values: ICreateJob) => {
    try {
      await apiCreateJob(values);
      notifications.show({
        title: 'Create Job successfully',
        message: 'Job created 🤥',
        color: 'green',
      });
      router.push('/home');
    } catch (error: any) {
      const message = error?.response?.data?.message;
      notifications.show({
        title: error?.message,
        message: `${error?.code} : ${message}`,
        color: 'red',
      });
    }
  };

  return (
    <Box>
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
        Create Job
      </Text>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('jobName')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput label="Camera" placeholder="Camera" {...form.getInputProps('camera')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <DateTimePicker
              label="Pick start date"
              placeholder="Pick start date"
              {...form.getInputProps('jobPeriodStart')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <DateTimePicker
              label="Pick end date"
              placeholder="Pick end date"
              {...form.getInputProps('jobPeriodEnd')}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="Description"
              placeholder="Input placeholder"
              {...form.getInputProps('description')}
            />
          </Grid.Col>
        </Grid>
        <Button type="submit" mt="md" fullWidth>
          submit
        </Button>
      </form>
    </Box>
  );
}
