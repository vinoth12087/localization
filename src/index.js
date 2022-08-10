import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'fr', 'ar'],
    fallbackLng: "en",
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'localStorage', 'subDomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: 'assets/locales/{{lng}}/translation.json'
    },
  });

const loadingMarkup = (
  <h2 style={{ textAlign: 'center' }}>Loading...</h2>
)
ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);
