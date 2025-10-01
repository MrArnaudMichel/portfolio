<script lang="ts" setup>
import * as z from 'zod'
import type {FormSubmitEvent} from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: 'Login',
  description: 'Login to your account to continue'
})

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Enter your password'
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox' as const
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({title: 'Google', description: 'Login with Google'})
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({title: 'GitHub', description: 'Login with GitHub'})
  }
}]

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :providers="providers"
    :schema="schema"
    icon="i-lucide-lock"
    title="Welcome back"
    @submit="onSubmit"
  >
    <template #description>
      Don't have an account?
      <ULink
        class="text-primary font-medium"
        to="/signup"
      >Sign up
      </ULink>
      .
    </template>

    <template #password-hint>
      <ULink
        class="text-primary font-medium"
        tabindex="-1"
        to="/"
      >Forgot password?
      </ULink>
    </template>

    <template #footer>
      By signing in, you agree to our
      <ULink
        class="text-primary font-medium"
        to="/"
      >Terms of Service
      </ULink>
      .
    </template>
  </UAuthForm>
</template>
