'use client';

import { Box, Button, Grid, Text, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface ICreateForm {
  name: string;
  startTime: string;
  endTime: string;
  camera: string;
  description: string;
}

export default function CreateFeature() {
  const router = useRouter();
  const form = useForm<ICreateForm>({
    initialValues: {
      name: '',
      startTime: '',
      endTime: '',
      camera: '',
      description: '',
    },
  });

  const onSubmit = (values: ICreateForm) => {
    notifications.show({
      title: 'Create Job successfully',
      message: 'Job created 🤥',
      color: 'green',
    });
    router.push('/home');
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
            <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput label="Camera" placeholder="Camera" {...form.getInputProps('camera')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput
              label="Start Time"
              placeholder="Start Time"
              {...form.getInputProps('startTime')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <TextInput label="End Time" placeholder="End Time" {...form.getInputProps('endTime')} />
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
