import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import TypesPage from './pages/TypesPage';
import TypeDetail from './pages/TypeDetail';
import NotFound from './pages/NotFound';

function Footer() {
  return (
    <footer className="footer">
      <p>
        Feito com <span>♥</span> usando{' '}
        <strong style={{ color: 'var(--text-secondary)' }}>React</strong> +{' '}
        <strong style={{ color: 'var(--text-secondary)' }}>PokéAPI</strong>
      </p>
      <p style={{ marginTop: 8, fontSize: 11 }}>
        Pokémon e todos os nomes relacionados são marcas registradas da Nintendo / Game Freak.
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/types" element={<TypesPage />} />
          <Route path="/types/:type" element={<TypeDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
