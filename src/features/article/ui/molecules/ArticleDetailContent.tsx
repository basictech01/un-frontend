interface ArticleDetailContentProps {
  content: string;
}

export function ArticleDetailContent({
  content,
}: ArticleDetailContentProps) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <div dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
    </div>
  );
}

function markdownToHtml(markdown: string): string {
  // Basic markdown rendering - paragraphs, headers, bold, italic, links
  return markdown
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      // Headers
      if (trimmed.startsWith("### "))
        return `<h3>${processInline(trimmed.slice(4))}</h3>`;
      if (trimmed.startsWith("## "))
        return `<h2>${processInline(trimmed.slice(3))}</h2>`;
      if (trimmed.startsWith("# "))
        return `<h1>${processInline(trimmed.slice(2))}</h1>`;

      // Paragraphs
      return `<p>${processInline(trimmed)}</p>`;
    })
    .join("");
}

function processInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/\n/g, "<br />");
}
