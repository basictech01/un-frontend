export function ArticleNewsletterCard() {
  return (
    <div className="p-6 bg-slate-blue rounded-2xl text-white">
      <h4 className="font-display text-lg font-bold mb-2">
        Subscribe to Newsletter
      </h4>
      <p className="text-xs text-slate-300 mb-4 leading-relaxed">
        The best of Himalayan journalism, delivered to your inbox weekly.
      </p>
      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email Address"
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 text-white"
        />
        <button className="bg-white text-slate-blue font-bold text-xs py-2 rounded-lg hover:bg-slate-100 transition-colors">
          Join Now
        </button>
      </div>
    </div>
  );
}
