import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/[lang]/Home';
import { About } from './pages/[lang]/About';
import { Skills } from './pages/[lang]/Skills';
import { Products } from './pages/[lang]/Products';
import { BlogList } from './pages/[lang]/blog/BlogList';
import { BlogDetail } from './pages/[lang]/blog/BlogDetail';
import { Contact } from './pages/[lang]/Contact';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { detectInitialLanguage } from './lib/i18n';

function LangLayout() {
  const { lang } = useParams<{ lang: string }>();
  if (lang !== 'ja' && lang !== 'en') {
    return <Navigate to={`/${detectInitialLanguage()}/`} replace />;
  }

  return (
    <I18nProvider>
      <div className="flex min-h-screen flex-col bg-white text-neutral-950 dark:bg-neutral-950 dark:text-white">
        <Navigation />
        <div className="flex-1">
          <ErrorBoundary>
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="products" element={<Products />} />
            <Route path="blog" element={<BlogList />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </I18nProvider>
  );
}

function RootRedirect() {
  return <Navigate to={`/${detectInitialLanguage()}/`} replace />;
}

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route index element={<RootRedirect />} />
          <Route path=":lang/*" element={<LangLayout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}
