import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import NotFound from './pages/NotFound';

const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route
            path="/about"
            element={
              <Suspense
                fallback={
                  <div className="container loading-state">
                    <div className="loading-card">
                      <div className="skeleton-line" />
                      <div className="skeleton-line" />
                      <div className="skeleton-line" />
                    </div>
                  </div>
                }
              >
                <About />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;

