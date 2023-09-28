import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { Accounts } from "./components/Accounts";
import { AccountExistingNew } from "./components/AccountExistingNew";
import { AccountDetails } from "./components/AccountDetails";
import { Transfers } from "./components/Transfers";
import { PageNotFound } from "./components/PageNotFound";
import { Footer } from "./components/footer";
import { Locations } from "./components/Locations";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/locations">
            <Locations />
          </Route>
          <ProtectedRoute exact path="/accounts/existingnew">
            <AccountExistingNew />
          </ProtectedRoute>
          <ProtectedRoute exact path="/accounts/:accountId">
            <AccountDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path="/accounts">
            <Accounts />
          </ProtectedRoute>
          <ProtectedRoute exact path="/transfers/:accountId">
            <Transfers />
          </ProtectedRoute>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route path="*" >
            <PageNotFound />
          </Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
