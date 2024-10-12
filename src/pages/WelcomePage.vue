<template>
    <router-link to="/welcome">
        <q-btn color="primary" label="Logout" class="button_login" @click.prevent="logOut" />
        <h1>Bien venido</h1>
    </router-link>

</template>

<script setup lang="ts">
import useAuth from '../store/auth'
import { useRouter } from 'vue-router'

const store = useAuth()
const router = useRouter()

const logOut = async () => {
  try {
    const response = await store.signOut()

    if (response.success) {
      router.push('/')
    }
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

</script>

<style scoped></style>
