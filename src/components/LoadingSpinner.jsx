export default function LoadingSpinner({ text = 'Carregando...' }) {
  return (
    <div className="loading-screen">
      <svg className="pokeball-loader" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#e53935" stroke="#333" strokeWidth="4"/>
        <path d="M2 50 Q2 2 50 2" fill="#e53935"/>
        <path d="M50 2 Q98 2 98 50" fill="#e53935"/>
        <path d="M98 50 Q98 98 50 98" fill="#1a1a35"/>
        <path d="M50 98 Q2 98 2 50" fill="#1a1a35"/>
        <rect x="2" y="46" width="96" height="8" fill="#222"/>
        <circle cx="50" cy="50" r="14" fill="white" stroke="#222" strokeWidth="4"/>
        <circle cx="50" cy="50" r="7" fill="#f0f0ff" stroke="#222" strokeWidth="2"/>
      </svg>
      <p className="loading-text">{text}</p>
    </div>
  );
}
