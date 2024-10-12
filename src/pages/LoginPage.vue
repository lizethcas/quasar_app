<template>
    <router-link to="/">
        <q-btn color="primary" label="Home" class="button_home" />
    </router-link>
    <LoginAuth @onSubmit="onSubmit" title="Login" checkBoxText="Recordarme" inputLabel="Contraseña*"
        buttonText="Iniciar sesión">
        <template v-slot:afterCheckbox>
            <h4 class="text-indigo-12 text-subtitle2 underline-offset-2 cursor-pointer">{{ dataLoginPage.textLink }}
            </h4>
        </template>
    </LoginAuth>

</template>

<style lang="sass">
div
  color: $red-1
  background-color: $grey-5
</style>

<script setup lang="ts">
import LoginAuth from '../components/LoginAuth.vue'
import useAuth from '../store/auth'
import { Texts } from '../models/models'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useAuth()
const $q = useQuasar()

const dataLoginPage: Texts = {
    textLink: '¿Olvidaste tu contraseñaaa?'
}

const onSubmit = async (email: string, password: string) => {
    const response = await store.login(email, password)

    if (response.success) {
        router.push('/welcome')
    } else {
        $q.notify({ message: response.errorMessage, icon: 'report_problem', color: 'negative' })
    }
}
</script>
