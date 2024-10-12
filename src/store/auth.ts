import { defineStore } from "pinia";
import { resetPassword } from "src/services/auth.service";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const useAuth = defineStore("auth", {
  state: () => {
    return {
      token: "",
    };
  },

  actions: {
    async sendPasswordResetEmail(email: string): Promise<{
      success: boolean;
      errorCode: number;
      msgError: string;
    }> {
      return await resetPassword(email);
    },

    async signOut(): Promise<{ success: boolean }> {
      const auth = getAuth();
      return new Promise<{ success: boolean }>((resolve) => {
        signOut(auth)
          .then(() => {
            this.token = "";
            resolve({ success: true });
          })
          .catch(() => {
            resolve({ success: false });
          });
      });
    },

    async login(
      email: string,
      password: string
    ): Promise<{ success: boolean; errorMessage?: string }> {
      const auth = getAuth();
      return new Promise<{ success: boolean; errorMessage?: string }>(
        (resolve) => {
          signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              const user = auth.currentUser;
              if (user) {
                user
                  .getIdToken(true)
                  .then((idToken) => {
                    this.token = idToken;
                    resolve({ success: true, errorMessage: undefined }); // Resuelve la promesa con éxito y sin error
                  })
                  .catch((error) => {
                    resolve({ success: false, errorMessage: error.message }); // Resuelve la promesa con éxito y el mensaje de error
                  });
              } else {
                resolve({
                  success: false,
                  errorMessage:
                    "Ha ocurrido un error, por favor intentalo mas tarde",
                }); // Resuelve la promesa con éxito y el mensaje de error
              }
            })
            .catch(() => {
              resolve({
                success: false,
                errorMessage: "Correo electrónico o contraseña no válidos.",
              }); // Resuelve la promesa con éxito y el mensaje de error
            });
        }
      );
    },
  },
});

export default useAuth;
