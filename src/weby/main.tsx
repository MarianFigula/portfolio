import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import './i18n';
import { LanguageProvider } from '../lib/language/LanguageProvider/LanguageProvider';
import WebyApp from './WebyApp';

createRoot(document.getElementById('weby-root')!).render(
    <StrictMode>
        <LanguageProvider>
            <WebyApp />
        </LanguageProvider>
    </StrictMode>,
);
