<template>

    <q-card class="shadow-12 login_form q-pa-md" style="max-width: 500px; width: 100%;">
        <h2 class="login_title">{{ props.title }}</h2>
        <q-form @submit.prevent="handleForm" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="email" label="Correo electronico*" hint="Email" lazy-rules
                :rules="[val => val && val.length > 0 || 'Por favor, ingresa una dirección de correo válida']" />

            <q-input filled type="password" v-model="password" :label="props.inputLabel" hint="Contraseña" lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'La contraseña debe tener al menos 6 caracteres',
                ]" />

            <div>
                <slot name="afterInputs"></slot>
                <q-checkbox v-model="customModel" color="secondary" :label="props.checkBoxText" true-value="yes"
                    false-value="no" />

            </div>
            <div class="justify-between row">
                <q-btn :label="props.buttonText" type="submit" color="primary" />
                <slot name="afterCheckbox"></slot>

            </div>
        </q-form>

    </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const customModel = ref('no')

const props = defineProps({
    title: String,
    checkBoxText: String,
    inputLabel: String,
    buttonText: String
})

const onReset = () => {
    email.value = ''
    password.value = ''
}

const emits = defineEmits(['onSubmit'])

const handleForm = () => {
    emits('onSubmit', email.value, password.value)
}
</script>

<style scoped lang="scss">
.login_form {
    margin: 15vh auto;

    .login_title {
        text-align: center;
    }
}
</style>
