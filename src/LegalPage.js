import React, { useState } from 'react';
import './App.css';

const translations = {
  en: {
    welcome_title: "Welcome to Lichtblicke-Hartha",
    welcome_text: "Your trusted partner.",
    login: "Login",
    rights: "All rights reserved.",
    legal: "Legal Info",
    impressum: "Impressum",
    impressum_title: "Impressum",
    legal_notice: "Legal obligation according to § 5 TMG",
    ceo: "CEO: Mark Lohrer",
    close: "Close"
  },
  de: {
    welcome_title: "Willkommen bei Lichtblicke-Hartha",
    welcome_text: "Ihr vertrauenswürdiger Partner.",
    login: "Anmelden",
    rights: "Alle Rechte vorbehalten.",
    legal: "Rechtliches",
    impressum: "Impressum",
    impressum_title: "Impressum",
    legal_notice: "Informationspflicht laut § 5 TMG",
    ceo: "Geschäftsführer: Mark Lohrer",
    close: "Schließen"
  }
};

const LegalPage = () => {
  const [language, setLanguage] = useState('en');
  const [showImpressum, setShowImpressum] = useState(false);

  const t = (key) => translations[language][key] || key;
  const toggleModal = () => setShowImpressum(!showImpressum);

  return (
    <div className="legal-page">
      <header>
        <h1>Lichtblicke-Hartha</h1>
        <div className="language-selector">
          <button onClick={() => setLanguage('en')}>🇬🇧 EN</button>
          <button onClick={() => setLanguage('de')}>🇩🇪 DE</button>
        </div>
      </header>

      <main>
        <h2>{t('welcome_title')}</h2>
        <p>{t('welcome_text')}</p>
        <div className="buttons">
          <a href="/login">{t('login')}</a>
        </div>
      </main>

      <footer>
        <span>&copy; 2025 TDA HR Software GmbH. {t('rights')}</span>
        <div className="footer-links">
          <a href="/legal">{t('legal')}</a>
          <button onClick={toggleModal} className="footer-link-button">
            {t('impressum')}
          </button>
        </div>
      </footer>

      {showImpressum && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{t('impressum_title')}</h3>
            <p><strong>{t('legal_notice')}</strong></p>
            <p>
              <strong>TDA-HR-Software-Entwicklungs GmbH</strong><br />
              Schloß Hülchrath 1 – Vorburg<br />
              41516 Grevenbroich-Hülchrath<br />
              Deutschland
            </p>
            <p>
              UID-Nummer: DE815284428<br />
              Register: Handelsregister<br />
              Registernummer: HRB 15293<br />
              Registergericht: Amtsgericht Mönchengladbach
            </p>
            <p>
              Tel.: 02182 / 82714-0<br />
              Fax: 02182 / 82714-29<br />
              E-Mail: <a href="mailto:mark.lohrer@tda-hr.de">mark.lohrer@tda-hr.de</a>
            </p>
            <p>{t('ceo')}</p>
            <button className="close-button" onClick={toggleModal}>
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalPage;