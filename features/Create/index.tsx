'use client';

import { Box, Button, Grid, Select, Text, TextInput, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { apiCreateJob, apiGetCameraList, apiGetJobDetail, apiUpdateJob } from '@/api/home';
import { ICreateJob } from '@/types';

interface ICreateFeature {
  type: 'create' | 'edit';
}

interface ICameraList {
  cameraName: string;
  id: string;
}

export default function CreateFeature({ type }: ICreateFeature) {
  const router = useRouter();
  const [cameraList, setCameraList] = useState<ICameraList[]>([]);
  const title = type === 'create' ? 'Create Job' : 'Edit Job';
  const submitLabel = type === 'edit' ? 'Edit' : 'Submit';
  const { id } = useParams();

  useEffect(() => {
    if (type === 'edit') {
      onGetJobDetail();
    }
  }, [type]);

  useEffect(() => {
    onGetCameraList();
  }, []);

  const onGetCameraList = async () => {
    try {
      const { data } = await apiGetCameraList();
      setCameraList(data?.data);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      notifications.show({
        title: error?.message,
        message: `${error?.code} : ${message}`,
        color: 'red',
      });
    }
  };

  const form = useForm<ICreateJob>({
    initialValues: {
      jobName: '',
      jobPeriodStart: '',
      jobPeriodEnd: '',
      camera: '',
      description: '',
      status: '',
    },
    validate: {
      jobName: (value) =>
        value.length < 3
          ? 'Name must have at least 3 letters'
          : value.length > 30
            ? 'Name must have less than 30 letters'
            : null,
      jobPeriodStart: (value) => (value ? null : 'Start Date is required'),
      jobPeriodEnd: (value) => (value ? null : 'Start Date is required'),
      description: (value) =>
        value.length < 3
          ? 'Description must have at least 3 letters'
          : value.length > 200
            ? 'Description must have less than 200 letters'
            : null,
      status: (value) => (type === 'create' ? null : value ? null : 'Status is required'),
    },
  });

  const onGetJobDetail = async () => {
    try {
      const res = await apiGetJobDetail(id as string);
      form.setValues({
        ...res.data[0],
        jobPeriodStart: dayjs(res.data[0].jobPeriodStart).toDate(),
        jobPeriodEnd: dayjs(res.data[0].jobPeriodEnd).toDate(),
      });
    } catch (error: any) {
      const message = error?.response?.data?.message;
      notifications.show({
        title: error?.message,
        message: `${error?.code} : ${message}`,
        color: 'red',
      });
    }
  };

  const onSubmit = async (values: ICreateJob) => {
    if (type === 'create') {
      onCreateJob(values);
    }
    if (type === 'edit') {
      onEditJob(values);
    }
  };

  const onCreateJob = async (values: ICreateJob) => {
    try {
      const res = await apiCreateJob(values);
      notifications.show({
        title: 'Create Job successfully',
        message: 'Job created 🥳',
        color: 'green',
      });
      router.push(`/progress/${res.data.id}`);
    } catch (error: any) {
      const message = error?.response?.data?.message;
      notifications.show({
        title: error?.message,
        message: `${error?.code} : ${message}`,
        color: 'red',
      });
    }
  };

  const onEditJob = async (values: ICreateJob) => {
    try {
      await apiUpdateJob(values);
      notifications.show({
        title: 'Edit Job successfully',
        message: 'Job Edited 🥳',
        color: 'green',
      });
      router.push('/home');
    } catch (error: any) {
      const message = error?.response?.data?.message;
      notifications.show({
        title: error?.message,
        message: `${error?.code} 🥺 : ${message}`,
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
        {title}
      </Text>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              id="jobName"
              label="Name"
              placeholder="Name"
              {...form.getInputProps('jobName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Select
              label="Camera"
              placeholder="Pick value"
              data={cameraList.map((c) => c.cameraName)}
              {...form.getInputProps('camera')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <DateTimePicker
              id="jobPeriodStart"
              label="Pick start date"
              placeholder="Pick start date"
              valueFormat="DD MMM YYYY HH:00"
              {...form.getInputProps('jobPeriodStart')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <DateTimePicker
              id="jobPeriodEnd"
              label="Pick end date"
              placeholder="Pick end date"
              valueFormat="DD MMM YYYY HH:00"
              minDate={dayjs(form.values.jobPeriodStart).toDate()}
              disabled={!form.values.jobPeriodStart}
              {...form.getInputProps('jobPeriodEnd')}
            />
          </Grid.Col>
          {type === 'edit' && (
            <Grid.Col span={{ base: 12 }}>
              <Select
                id="status"
                label="Status"
                placeholder="Pick value"
                data={['waiting', 'done', 'working', 'failed']}
                {...form.getInputProps('status')}
              />
            </Grid.Col>
          )}
          <Grid.Col span={12}>
            <Textarea
              id="description"
              label="Description"
              placeholder="Input placeholder"
              {...form.getInputProps('description')}
            />
          </Grid.Col>
        </Grid>
        <Button type="submit" mt="md" fullWidth bg={type === 'edit' ? 'green' : 'main'}>
          {submitLabel}
        </Button>
      </form>
    </Box>
  );
}
