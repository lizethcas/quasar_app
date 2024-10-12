<template>

    <LoginAuth @onSubmit="onSubmit" title="Login" checkBoxText="Recordarme" inputLabel="Contraseña*" />

</template>

<script setup lang="ts">
import LoginAuth from '../components/LoginAuth.vue'

const onSubmit = () => [
  console.log('registrar')
]

</script>

<style scoped></style>
