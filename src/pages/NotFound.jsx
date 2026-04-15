import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found page-enter">
      <div className="not-found-code">404</div>
      <p style={{ fontFamily: 'var(--font-pixel)', fontSize: 14, color: 'var(--text-secondary)' }}>
        Página não encontrada
      </p>
      <p style={{ color: 'var(--text-muted)', maxWidth: 360, marginTop: 8 }}>
        O Pokémon que você procura fugiu para a grama alta...
      </p>
      <button
        className="retry-btn"
        style={{ marginTop: 24 }}
        onClick={() => navigate('/')}
      >
        ← Ir para o início
      </button>
    </div>
  );
}
