'use client'

import {
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  TextInput,
  Title
} from '@mantine/core'

import classes from './styles.module.css'

export function LoginFeature() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Capstone!
        </Title>
        <TextInput label="Email" placeholder="hello@gmail.com" size="md" />
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md">
          Login
        </Button>
      </Paper>
    </div>
  );
}