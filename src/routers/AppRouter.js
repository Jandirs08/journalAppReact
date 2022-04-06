import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";

import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  // HAY ALGO QUE FIREBASE ME VA DECIR CUANDO LA AUTENTICACION CAMBIA
  // la funcion se va ejecutar  cuando el estado de la autenticacion cambia (UID - logout)
  const dispatch = useDispatch();
  //   ? revisando el estado de firabase, mientras sea true no muestro nada de la aplicacion
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   !
  useEffect(() => {
    //   !SE EJECUTA UNA SOLA VEZ PERO CADA VEZ QUE EL USER CAMBIA SE VA VOLVER A EJECUTAR EL ON AUTHSTATECHANGED
    const auth = getAuth();

    // crea un observable es un tipo de objeto especial que se puede disparar mas de uan vez
    // !CUANDO AUTENTICACION CAMBIA, SE VUELVE A LOGEAR (ESTAR ATENTO)
    onAuthStateChanged(auth, (user) => {
      // cuando cambia ejecuto algo
      //   console.log(user);
      //   si el objecto tiene algo pregunta si hay uid
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Espere....</h1>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <JournalScreen />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate replace to="/auth/" />} />
      </Routes>
    </Router>
  );
};
