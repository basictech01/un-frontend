import MDEditor from "@uiw/react-md-editor";

interface ArticleDetailContentProps {
  content: string;
}

export function ArticleDetailContent({
  content,
}: ArticleDetailContentProps) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert">
      <MDEditor.Markdown
        source={content}
        wrapperElement={{
          "data-color-mode": "light",
        }}
      />
    </div>
  );
}
