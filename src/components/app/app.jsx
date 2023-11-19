import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from '../../pages/main-page'
import NotFoundPage from '../../pages/not-found-page'
import LoginPage from '../../pages/login-page';
import RegisterPage from '../../pages/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page';
import ProfilePage from '../../pages/profile-page';
import IngredientPage from '../../pages/ingredient-page';
import ProtectedRouteElement from '../../components/private-route/protected-route-element'
import PublicRouteElement from '../../components/public-route/public-route-element'

function App() {

  return (
    <BrowserRouter>
      <div className={styles.main}>
        <AppHeader />
        <main className={styles.articleContainer}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/ingredient" element={<IngredientPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route element={<PublicRouteElement />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>
            <Route element={<ProtectedRouteElement />}>
              <Route path="/profile/*" element={<ProfilePage />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
