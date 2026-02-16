"use client";

import * as React from "react";
import { Button } from "@/ui/button";
import { cn } from "@/lib/utils";
import type { ImageFile } from "@/types/common";

const EMPTY_IMAGE: ImageFile = {
  previewUrl: "",
};

interface ImagePickerProps {
  id?: string;
  value: ImageFile;
  onChange: (file: ImageFile) => void;
  aspectRatio?: "16/9" | "9/16" | "1/1";
  label?: string;
  className?: string;
}

export function ImagePicker({
  id,
  value,
  onChange,
  aspectRatio = "16/9",
  label,
  className,
}: ImagePickerProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Map aspect ratio to Tailwind classes
  const aspectRatioClass = {
    "16/9": "aspect-video",
    "9/16": "aspect-[9/16]",
    "1/1": "aspect-square",
  }[aspectRatio];

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) {
      onChange(EMPTY_IMAGE);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      onChange(EMPTY_IMAGE);
      return;
    }
    onChange({ previewUrl: URL.createObjectURL(file), file });
  }

  function handleClearImage() {
    onChange(EMPTY_IMAGE);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="rounded-md border bg-muted/20 p-2">
          <div
            className={cn(
              aspectRatioClass,
              "w-full overflow-hidden rounded border bg-background sm:w-48"
            )}
          >
            {value.previewUrl ? (
              <img
                src={value.previewUrl}
                alt="Selected image preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
                No image selected
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={inputRef}
            id={id}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            size="sm"
            onClick={() => inputRef.current?.click()}
          >
            {value.file ? "Change" : "Upload"}
          </Button>
          {value.file && (
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleClearImage}
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

export { EMPTY_IMAGE };
