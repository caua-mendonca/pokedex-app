import { useState, useEffect, useCallback } from 'react';
import PokemonCard from '../components/PokemonCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchPokemonList, fetchPokemon } from '../services/api';
import { TYPE_COLORS } from '../utils/typeColors';

const TYPES = Object.keys(TYPE_COLORS);
const PAGE_SIZE = 24;

export default function Home() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [activeType, setActiveType] = useState('todos');
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadInitial();
  }, []);

  async function loadInitial() {
    try {
      setLoading(true);
      const { pokemon, count } = await fetchPokemonList(PAGE_SIZE, 0);
      setAllPokemon(pokemon);
      setDisplayed(pokemon);
      setTotal(count);
      setOffset(PAGE_SIZE);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (search || activeType !== 'todos') return;
    try {
      setLoadingMore(true);
      const { pokemon } = await fetchPokemonList(PAGE_SIZE, offset);
      setAllPokemon(prev => [...prev, ...pokemon]);
      setDisplayed(prev => [...prev, ...pokemon]);
      setOffset(prev => prev + PAGE_SIZE);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoadingMore(false);
    }
  }

  async function handleSearch() {
    const q = searchInput.trim().toLowerCase();
    if (!q) {
      setSearch('');
      setDisplayed(allPokemon);
      setActiveType('todos');
      return;
    }
    setSearch(q);
    setActiveType('todos');
    setSearching(true);
    try {
      const result = await fetchPokemon(q);
      setDisplayed([result]);
    } catch {
      setDisplayed([]);
    } finally {
      setSearching(false);
    }
  }

  function handleTypeFilter(type) {
    setActiveType(type);
    setSearch('');
    setSearchInput('');
    if (type === 'todos') {
      setDisplayed(allPokemon);
    } else {
      setDisplayed(
        allPokemon.filter(p =>
          p.types.some(t => t.type.name === type)
        )
      );
    }
  }

  function clearSearch() {
    setSearch('');
    setSearchInput('');
    setActiveType('todos');
    setDisplayed(allPokemon);
  }

  if (loading) return <LoadingSpinner text="Carregando Pokémon..." />;
  if (error) return (
    <div className="error-screen">
      <div className="error-emoji">😵</div>
      <p className="error-title">Erro!</p>
      <p className="error-msg">{error}</p>
      <button className="retry-btn" onClick={loadInitial}>Tentar novamente</button>
    </div>
  );

  const showLoadMore = !search && activeType === 'todos' && offset < total;

  return (
    <div className="page-enter">
      <section className="hero">
        <p className="hero-eyebrow">✦ POKÉDEX NACIONAL ✦</p>
        <h1 className="hero-title">Escolha seu<br/>Pokémon!</h1>
        <p className="hero-subtitle">
          Explore a enciclopédia completa com dados reais da PokéAPI
        </p>
        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar por nome ou número..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          {search ? (
            <button className="search-btn" onClick={clearSearch} style={{ background: '#555' }}>
              ✕ Limpar
            </button>
          ) : (
            <button className="search-btn" onClick={handleSearch} disabled={searching}>
              {searching ? '...' : '🔍 Buscar'}
            </button>
          )}
        </div>
      </section>

      {!search && (
        <div className="filter-section container">
          <p className="filter-label">Filtrar por tipo</p>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${activeType === 'todos' ? 'active' : ''}`}
              onClick={() => handleTypeFilter('todos')}
              style={activeType === 'todos' ? { background: '#555', color: '#fff' } : {}}
            >
              Todos
            </button>
            {TYPES.map(type => {
              const color = TYPE_COLORS[type];
              return (
                <button
                  key={type}
                  className={`filter-tab ${activeType === type ? 'active' : ''}`}
                  onClick={() => handleTypeFilter(type)}
                  style={activeType === type
                    ? { background: color.bg, color: color.text, borderColor: 'transparent' }
                    : {}}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {displayed.length === 0 ? (
        <div className="error-screen">
          <div className="error-emoji">🔍</div>
          <p className="error-title">Não encontrado</p>
          <p className="error-msg">Nenhum Pokémon corresponde à busca.</p>
          <button className="retry-btn" onClick={clearSearch}>Ver todos</button>
        </div>
      ) : (
        <div className="pokemon-grid">
          {displayed.map(p => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>
      )}

      {showLoadMore && (
        <div className="load-more-section">
          <button
            className="load-more-btn"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Carregando...' : `Carregar mais (${total - offset} restantes)`}
          </button>
        </div>
      )}
    </div>
  );
}
