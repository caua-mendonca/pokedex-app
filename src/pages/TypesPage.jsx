import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchTypes } from '../services/api';
import { TYPE_COLORS, TYPE_ICONS } from '../utils/typeColors';

const EXCLUDED = ['unknown', 'shadow'];

export default function TypesPage() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTypes();
        setTypes(data.results.filter(t => !EXCLUDED.includes(t.name)));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSpinner text="Carregando tipos..." />;
  if (error) return (
    <div className="error-screen">
      <div className="error-emoji">😵</div>
      <p className="error-title">Erro</p>
      <p className="error-msg">{error}</p>
    </div>
  );

  return (
    <div className="page-enter">
      <section className="hero">
        <p className="hero-eyebrow">✦ ENCICLOPÉDIA ✦</p>
        <h1 className="hero-title">Tipos de<br/>Pokémon</h1>
        <p className="hero-subtitle">
          Explore todos os 18 tipos e descubra quais Pokémon pertencem a cada um.
        </p>
      </section>

      <div className="types-grid">
        {types.map(type => {
          const colors = TYPE_COLORS[type.name] || { bg: '#888', text: '#fff' };
          const icon = TYPE_ICONS[type.name] || '❓';
          return (
            <div
              key={type.name}
              className="type-card"
              onClick={() => navigate(`/types/${type.name}`)}
              style={{
                borderColor: `${colors.bg}44`,
                '--type-bg': colors.bg,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${colors.bg}22`;
                e.currentTarget.style.borderColor = colors.bg;
                e.currentTarget.style.color = colors.bg;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-card)';
                e.currentTarget.style.borderColor = `${colors.bg}44`;
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/types/${type.name}`)}
            >
              <span className="type-icon">{icon}</span>
              <span>{type.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
