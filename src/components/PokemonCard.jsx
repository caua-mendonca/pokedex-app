import { useNavigate } from 'react-router-dom';
import TypeBadge from './TypeBadge';
import { getPokemonImage } from '../services/api';
import { TYPE_COLORS } from '../utils/typeColors';

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate();
  const id = pokemon.id;
  const name = pokemon.name;
  const types = pokemon.types.map(t => t.type.name);
  const primaryType = types[0];
  const color = TYPE_COLORS[primaryType]?.bg || '#888';

  return (
    <div
      className="pokemon-card"
      onClick={() => navigate(`/pokemon/${id}`)}
      style={{ '--card-glow': `${color}33` }}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/pokemon/${id}`)}
      aria-label={`Ver detalhes de ${name}`}
    >
      <p className="card-number">#{String(id).padStart(3, '0')}</p>
      <div className="card-image-wrapper">
        <img
          className="card-image"
          src={getPokemonImage(id)}
          alt={name}
          loading="lazy"
          onError={e => {
            e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          }}
        />
      </div>
      <p className="card-name">{name}</p>
      <div className="card-types">
        {types.map(type => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </div>
  );
}
