import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import PokemonCard from '../components/PokemonCard';
import { fetchType, fetchPokemon } from '../services/api';
import { TYPE_COLORS, TYPE_ICONS } from '../utils/typeColors';

export default function TypeDetail() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [typeData, setTypeData] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  const [error, setError] = useState(null);
  const [showCount, setShowCount] = useState(24);

  useEffect(() => {
    loadType();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [type]);

  async function loadType() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchType(type);
      setTypeData(data);
      // Load first batch of Pokémon
      loadPokemonBatch(data.pokemon.slice(0, 24));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadPokemonBatch(list) {
    setLoadingPokemon(true);
    try {
      const results = await Promise.allSettled(
        list.map(p => fetchPokemon(p.pokemon.name))
      );
      const loaded = results
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value)
        .filter(p => p.id <= 1010); // Filter out extra forms
      setPokemon(loaded);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPokemon(false);
    }
  }

  if (loading) return <LoadingSpinner text={`Carregando tipo ${type}...`} />;
  if (error) return (
    <div className="error-screen">
      <div className="error-emoji">😵</div>
      <p className="error-title">Tipo não encontrado</p>
      <p className="error-msg">{error}</p>
      <button className="retry-btn" onClick={() => navigate('/types')}>← Voltar</button>
    </div>
  );

  const colors = TYPE_COLORS[type] || { bg: '#888', text: '#fff' };
  const icon = TYPE_ICONS[type] || '❓';

  // Damage relations
  const dr = typeData.damage_relations;
  const strongAgainst = dr.double_damage_to.map(t => t.name);
  const weakTo = dr.double_damage_from.map(t => t.name);
  const immuneTo = dr.no_damage_from.map(t => t.name);
  const resistantTo = dr.half_damage_from.map(t => t.name);

  return (
    <div className="detail-page page-enter">
      <div
        className="detail-hero"
        style={{
          background: `linear-gradient(135deg, ${colors.bg}20 0%, transparent 60%)`,
          paddingBottom: 48,
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <button className="back-btn" onClick={() => navigate('/types')}>
            ← Tipos
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
            <span style={{ fontSize: 64 }}>{icon}</span>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
                Tipo
              </p>
              <h1
                className="detail-name"
                style={{ textTransform: 'capitalize', color: colors.bg }}
              >
                {type}
              </h1>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {strongAgainst.length > 0 && (
              <RelationCard
                title="⚔️ Forte contra"
                types={strongAgainst}
                accentColor="#4caf50"
              />
            )}
            {weakTo.length > 0 && (
              <RelationCard
                title="🛡️ Fraco contra"
                types={weakTo}
                accentColor="#ef5350"
              />
            )}
            {immuneTo.length > 0 && (
              <RelationCard
                title="🚫 Imune a"
                types={immuneTo}
                accentColor="#9e9e9e"
              />
            )}
            {resistantTo.length > 0 && (
              <RelationCard
                title="💪 Resistente a"
                types={resistantTo}
                accentColor="#42a5f5"
              />
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
          <p className="section-title" style={{ fontFamily: 'var(--font-pixel)', fontSize: 10, color: 'var(--accent-yellow)', letterSpacing: 2 }}>
            Pokémon do tipo {type}
          </p>
          <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            ({typeData.pokemon.length} total)
          </span>
        </div>

        {loadingPokemon ? (
          <LoadingSpinner text="Carregando Pokémon..." />
        ) : (
          <div className="pokemon-grid">
            {pokemon.map(p => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RelationCard({ title, types, accentColor }) {
  return (
    <div
      className="stats-section"
      style={{ borderLeft: `3px solid ${accentColor}`, marginBottom: 0 }}
    >
      <p style={{ fontSize: 13, fontWeight: 800, color: accentColor, marginBottom: 12 }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {types.map(t => {
          const colors = TYPE_COLORS[t] || { bg: '#888', text: '#fff' };
          return (
            <span
              key={t}
              className="type-badge"
              style={{ background: colors.bg, color: colors.text }}
            >
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}
