import { error } from 'console'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth'

const resetPassword = async (
  email: string
): Promise<{
  success: boolean;
  errorCode: number;
  msgError: string;
}> => {
  const auth = getAuth()
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      return {
        success: true,
        errorCode: 0,
        msgError: 'Email enviado con exito'
      }
    })
    .catch((error) => {
      return errorsCodes(error.code)
    })
}

const errorsCodes = (code: string) => {
  switch (code) {
    case 'auth/invalid-email':
      return {
        success: false,
        errorCode: 1,
        msgError: 'Ingresa un correo valido'
      }
    case 'auth/too-many-requests':
      return {
        success: false,
        errorCode: 2,
        msgError: 'La cantidad de solicitudes supera el máximo permitido'
      }
    default:
      return {
        success: false,
        errorCode: 3,
        msgError: 'Error inesperado, por favor intentelo mas tarde'
      }
  }
}

export { resetPassword }
