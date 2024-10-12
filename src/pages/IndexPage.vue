<template>
  <div class="q-gutter-sm q-pa-md">
    <q-btn label="Iniciar sesión" color="primary" @click="showModal = true" />

    <q-dialog v-model="showModal" v-if="!showModalResetPassword">
      <LoginAuth @onSubmit="onSubmit" title="Login" checkBoxText="Recordarme" inputLabel="Contraseña*"
        buttonText="Iniciar sesión">
        <template v-slot:afterCheckbox>
          <h4 @click="showModalResetPassword = true"
            class="text-indigo-12 text-subtitle2 underline-offset-2 cursor-pointer">{{ dataLoginPage.textLink }}</h4>
        </template>
      </LoginAuth>
    </q-dialog>

    <q-dialog v-model="showModalResetPassword">
      <q-card class="shadow-12 login_form q-pa-md" style="max-width: 500px; width: 100%;">
        <q-section v-if="!sendEmail && errorCode !== 2">
          <h4 class="q-my-md text-h4">{{ dataLoginPage.textLink }}</h4>
          <p class="text-body1">Escribe el correo electrónico con el cuál te registraste y te enviaremos las
            instrucciones
            de restablecimiento.</p>
          <q-form @submit.prevent="recoveredPassword" class="q-my-md q-gutter-md">
            <q-input filled v-model="email" label="Correo electronico*" hint="Email" lazy-rules
              :rules="[val => val && val.length > 0 || 'Por favor, ingresa una dirección de correo válida']" />
            <q-btn label="Enviar" type="submit" color="primary" />
          </q-form>
        </q-section>

        <q-section v-else-if="errorCode == 2">
          <p class="text-body1">Has solicitado el cambio de contraseña varias veces en un corto período. Por razones de
            seguridad, hemos limitado la cantidad de solicitudes de cambio de contraseña. Por favor, espera unos minutos
            antes de intentarlo nuevamente.</p>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" @click="closeModal" />
          </q-card-actions>
        </q-section>

        <q-section v-else>
          <h4 class="q-my-md text-h4">¡La ayuda está en camino!</h4>
          <p class="text-body1">Si encontramos una cuenta de usuario, te enviaremos un correo electrónico con más
            información acerca de cómo restablecer tu contraseña.</p>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" @click="closeModal" />
          </q-card-actions>
        </q-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import LoginAuth from '../components/LoginAuth.vue'
import useAuth from '../store/auth'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Texts, PasswordResetResponse } from '../models/models'

const router = useRouter()
const store = useAuth()
const $q = useQuasar()
const showModal = ref(false)
const showModalResetPassword = ref(false)
const sendEmail = ref(false)
const email = ref('')
const errorCode = ref()

const dataLoginPage: Texts = {
  textLink: '¿Olvidaste tu contraseña?'
}

const recoveredPassword = async () => {
  const response: PasswordResetResponse = await store.sendPasswordResetEmail(email.value)
  if (response.success) {
    showModalResetPassword.value = true
    sendEmail.value = true
    $q.notify({ message: response.msgError, icon: 'check_circle', color: 'positive' })
  }

  if (response.errorCode === 2) {
    errorCode.value = 2
    showModal.value = !showModal.value
    sendEmail.value = !sendEmail.value
    $q.notify({
      message: response.msgError, icon: 'report_problem', color: 'negative'
    })
  }
}

const onSubmit = async (email: string, password: string) => {
  const response = await store.login(email, password)

  if (response.success) {
    router.push('/welcome')
  } else {
    $q.notify({ message: response.errorMessage, icon: 'report_problem', color: 'negative' })
  }
}

const closeModal = () => {
  showModalResetPassword.value = false// Cerrar el modal completamente
  showModal.value = !sendEmail.value
  sendEmail.value = !sendEmail.value
  email.value = ''
  errorCode.value = 0
}
</script>
