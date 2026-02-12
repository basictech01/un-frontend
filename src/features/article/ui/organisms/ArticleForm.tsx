"use client";

import dynamic from "next/dynamic";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Checkbox } from "@/ui/checkbox";
import {
  SECTIONS,
  getSubsectionsForSection,
  SUBSECTIONS,
} from "@/types/enums";
import type { ArticleFormState } from "../../types";
import { ImagePicker, EMPTY_IMAGE } from "@/components/molecules/ImagePicker";
import { commands } from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] animate-pulse rounded-md bg-muted" />
  ),
});

interface ArticleFormProps {
  formData: ArticleFormState;
  onChange: (field: keyof ArticleFormState, value: unknown) => void;
}

export function ArticleForm({ formData, onChange }: ArticleFormProps) {
  const availableSubsections = formData.section
    ? getSubsectionsForSection(formData.section)
    : [];

  const handleSectionChange = (value: string) => {
    onChange("section", value);
    onChange("subsections", []);
  };

  const handleSubsectionToggle = (sub: string, checked: boolean) => {
    const current = formData.subsections;
    if (checked) {
      onChange("subsections", [...current, sub]);
    } else {
      onChange(
        "subsections",
        current.filter((s) => s !== sub)
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Title - Full Width */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter a compelling title"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
        />
      </div>

      {/* Image + Excerpt/Metadata Section */}
      <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
        {/* Cover Image */}
        <div className="space-y-2">
          <Label>Cover image</Label>
          <ImagePicker
            value={formData.coverImageFile ?? EMPTY_IMAGE}
            onChange={(imageFile) => onChange("coverImageFile", imageFile)}
            id="coverImage"
          />
          <p className="text-xs text-muted-foreground">
            PNG or JPG up to ~5MB. A preview will appear after you select an
            image.
          </p>
        </div>

        {/* Excerpt + Section/Subsections */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => onChange("excerpt", e.target.value)}
              placeholder="Brief summary of the article"
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              A short description that will appear in article previews.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 min-h-[120px]">
            <div className="space-y-2 mb-8">
              <Label>Section</Label>
              <Select
                value={formData.section}
                onValueChange={handleSectionChange}
              >
                <SelectTrigger aria-label="Select section">
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(SECTIONS).map((s) => (
                    <SelectItem key={s.key} value={s.key}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 mb-8">
              <Label>Subsections</Label>
              {availableSubsections.length > 0 ? (
                <div className="flex flex-wrap gap-2 rounded-md border border-input bg-background p-2.5">
                  {availableSubsections.map((sub) => (
                    <label
                      key={sub}
                      className="flex items-center gap-1.5 rounded-md bg-muted px-2.5 py-1.5 text-sm transition-colors hover:bg-muted/80"
                    >
                      <Checkbox
                        checked={formData.subsections.includes(sub)}
                        onCheckedChange={(checked) =>
                          handleSubsectionToggle(sub, checked === true)
                        }
                      />
                      {SUBSECTIONS[sub]?.label ?? sub}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex h-10 items-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground">
                  Select a section first
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Editor */}
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <div className="h-[400px] lg:h-[500px]">
          <MDEditor
            value={formData.content}
            onChange={(data) => onChange("content", data || "")}
            data-color-mode="light"
            height="100%"
            minHeight={300}
            overflow={false}
            commands={[
              commands.heading1,
              commands.heading2,
              commands.group(
                [
                  commands.heading3,
                  commands.heading4,
                  commands.heading5,
                  commands.heading6,
                ],
                {
                  name: "title",
                  groupName: "title",
                  buttonProps: { "aria-label": "Insert title" },
                }
              ),
              commands.divider,
              commands.bold,
              commands.italic,
              commands.strikethrough,
              commands.hr,
              commands.divider,
              commands.link,
              commands.quote,
              commands.code,
              commands.codeBlock,
              commands.unorderedListCommand,
              commands.orderedListCommand,
              commands.checkedListCommand,
              commands.divider,
              commands.table,
              commands.fullscreen,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
