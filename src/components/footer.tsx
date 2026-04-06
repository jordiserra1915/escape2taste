export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-10">
      <div className="container-site flex flex-col items-start justify-between gap-3 text-sm text-zinc-400 md:flex-row">
        <p>Escape2Taste © {new Date().getFullYear()}.</p>
        <p>Experiencias inmersivas que mezclan aventura y gastronomía.</p>
      </div>
    </footer>
  );
}
