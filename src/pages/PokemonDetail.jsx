import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import TypeBadge from '../components/TypeBadge';
import {
  fetchPokemon,
  fetchPokemonSpecies,
  fetchEvolutionChain,
  getPokemonImage,
  getPokemonId,
  flattenChain,
} from '../services/api';
import { TYPE_COLORS, STAT_COLORS, STAT_LABELS } from '../utils/typeColors';

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const pData = await fetchPokemon(id);
      setPokemon(pData);

      const sData = await fetchPokemonSpecies(pData.id);
      setSpecies(sData);

      const evoData = await fetchEvolutionChain(sData.evolution_chain.url);
      setEvolutions(flattenChain(evoData.chain));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner text={`Buscando #${String(id).padStart(3, '0')}...`} />;
  if (error) return (
    <div className="error-screen">
      <div className="error-emoji">😵</div>
      <p className="error-title">Ops!</p>
      <p className="error-msg">{error}</p>
      <button className="retry-btn" onClick={() => navigate(-1)}>← Voltar</button>
    </div>
  );

  const types = pokemon.types.map(t => t.type.name);
  const primaryType = types[0];
  const primaryColor = TYPE_COLORS[primaryType]?.bg || '#888';
  const maxStat = 255;

  const flavorText = species?.flavor_text_entries
    ?.find(f => f.language.name === 'en')
    ?.flavor_text?.replace(/\f/g, ' ')
    ?.replace(/\n/g, ' ') || '';

  return (
    <div className="detail-page page-enter">
      <div
        className="detail-hero"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}15 0%, transparent 60%)`,
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Voltar
          </button>

          <div className="detail-grid">
            <div className="detail-image-section">
              <div
                className="detail-bg-circle"
                style={{ background: primaryColor }}
              />
              <img
                className="detail-pokemon-img"
                src={getPokemonImage(pokemon.id)}
                alt={pokemon.name}
                onError={e => {
                  e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
                }}
              />
            </div>

            <div>
              <p className="detail-id">#{String(pokemon.id).padStart(3, '0')}</p>
              <h1 className="detail-name">{pokemon.name}</h1>

              <div className="detail-types">
                {types.map(t => (
                  <TypeBadge key={t} type={t} size="lg" />
                ))}
              </div>

              {flavorText && (
                <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 15, lineHeight: 1.7, fontStyle: 'italic' }}>
                  "{flavorText}"
                </p>
              )}

              <div className="info-grid">
                <div className="info-card">
                  <p className="info-label">Altura</p>
                  <p className="info-value">{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div className="info-card">
                  <p className="info-label">Peso</p>
                  <p className="info-value">{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
                <div className="info-card">
                  <p className="info-label">Exp. Base</p>
                  <p className="info-value">{pokemon.base_experience ?? '—'}</p>
                </div>
                <div className="info-card">
                  <p className="info-label">Geração</p>
                  <p className="info-value">
                    {species?.generation?.name?.replace('generation-', '').toUpperCase() ?? '—'}
                  </p>
                </div>
              </div>

              <div className="stats-section">
                <p className="section-title">Habilidades</p>
                <div className="abilities-list">
                  {pokemon.abilities.map(a => (
                    <span
                      key={a.ability.name}
                      className={`ability-tag ${a.is_hidden ? 'hidden' : ''}`}
                    >
                      {a.ability.name}
                      {a.is_hidden && <span style={{ fontSize: 10, opacity: 0.7 }}> (oculta)</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 24px' }}>
        <div className="stats-section">
          <p className="section-title">Estatísticas Base</p>
          {pokemon.stats.map(s => {
            const name = s.stat.name;
            const val = s.base_stat;
            const color = STAT_COLORS[name] || '#888';
            return (
              <div key={name} className="stat-row">
                <span className="stat-name">{STAT_LABELS[name] || name}</span>
                <span className="stat-value">{val}</span>
                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill"
                    style={{
                      width: `${(val / maxStat) * 100}%`,
                      background: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
          <div
            className="stat-row"
            style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}
          >
            <span className="stat-name" style={{ fontWeight: 800, color: 'var(--text-secondary)' }}>Total</span>
            <span className="stat-value" style={{ color: 'var(--accent-yellow)' }}>
              {pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0)}
            </span>
            <div />
          </div>
        </div>
      </div>

      {evolutions.length > 1 && (
        <div className="evolutions-section">
          <div className="stats-section" style={{ marginBottom: 16 }}>
            <p className="section-title">Cadeia Evolutiva</p>
          </div>
          <div className="evolution-chain">
            {evolutions.map((evo, i) => {
              const evoId = getPokemonId(evo.url);
              const isCurrent = evoId === pokemon.id;
              return (
                <div key={evo.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {i > 0 && <span className="evolution-arrow">→</span>}
                  <Link to={`/pokemon/${evoId}`}>
                    <div className={`evolution-item ${isCurrent ? 'current' : ''}`}>
                      <img
                        src={getPokemonImage(evoId)}
                        alt={evo.name}
                        onError={e => {
                          e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evoId}.png`;
                        }}
                      />
                      <span className="evolution-name">{evo.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        #{String(evoId).padStart(3, '0')}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, padding: '16px 24px 64px' }}>
        {pokemon.id > 1 && (
          <button
            className="search-btn"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: 999 }}
            onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)}
          >
            ← #{String(pokemon.id - 1).padStart(3, '0')}
          </button>
        )}
        <button
          className="search-btn"
          style={{ padding: '12px 24px', borderRadius: 999 }}
          onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)}
        >
          #{String(pokemon.id + 1).padStart(3, '0')} →
        </button>
      </div>
    </div>
  );
}
