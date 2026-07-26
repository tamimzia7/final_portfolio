export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-width-container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Tamim Zia. All rights reserved.</p>
        <div className="flex items-center gap-6">
          {[
            { label: "GitHub", url: "https://github.com/tamimzia" },
            { label: "LinkedIn", url: "https://linkedin.com/in/tamimzia" },
            { label: "Facebook", url: "https://facebook.com/tamimzia" }
          ].map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-accent transition-colors">{l.label}</a>
          ))}
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs text-white/30 hover:text-accent transition-colors">&uarr; Top</button>
        </div>
      </div>
    </footer>
  );
}
