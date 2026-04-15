import { TYPE_COLORS } from '../utils/typeColors';

export default function TypeBadge({ type, size = 'sm' }) {
  const colors = TYPE_COLORS[type] || { bg: '#888', text: '#fff' };
  return (
    <span
      className="type-badge"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        fontSize: size === 'lg' ? '13px' : '11px',
        padding: size === 'lg' ? '5px 18px' : '3px 12px',
      }}
    >
      {type}
    </span>
  );
}
