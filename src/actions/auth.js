import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  googleAuthProvider,
  signInWithPopup,
  getAuth,
} from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";

// export const login = (uid, displayName) => {
//   return {
//    !COMO SOLO RETORNA UN OBJETO SE HACE DE LA FORMA CORTA
//     types: types.login,
//     payload: {
//       uid,
//       displayName,
//     },
//   };
// };
// !ACCION ASINCRONA

export const startLoginEmailPassword = (email, password) => {
  // retorna regresa un callback
  //   lo que reciba el middleware cuando reciba una accion
  // CREAR UNA ACCION QUE DISPARA OTRA ACCION CUANDO SE RESUELVE EL TIMEOUT(TAREA ASINCRONA)
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
        //   console.log(user);
      })
      .catch((e) => {
        console.log(e);
        dispatch(finishLoading());
        Swal.fire("Error", "User not found, wrong email or password", "error");
      });
  };
};
// GOOGLE
export const startGoogleLogin = () => {
  return (dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
      dispatch(login(user.uid, user.displayName));
    });
  };
};
// !REGISTRO DE UN NUEVO USUARIO
export const startRegisterWIthEmailPasswordName = (email, password, name) => {
  //* una vez creado el usuario en firebase se lanza el dispatch
  return (dispatch) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        //   dispatch(login(user.uid, user.displayName));
        //   devuelve una promesa se puede poner then pero apra eviatar eso se pone el async
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
        console.log(user);
      })
      .catch((e) => {
        console.log(e);
        Swal.fire("Error", "User already registered", "error");
      });
  };
};
// !FIN

export const login = (uid, displayName) => ({
  //   COMO SOLO RETORNA UN OBJETO SE HACE DE LA FORMA CORTA
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});
// es asincrono
export const startLogout = () => {
  // dispatch que me ofrece thunk
  //   como voy a esperar que eso se ejecute pongo async
  return async (dispatch) => {
    const auth = getAuth();
    // regresa una promesa
    //si ejecuta el then se hizo el logout correctamente
    await signOut(auth);
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.logout,
});
