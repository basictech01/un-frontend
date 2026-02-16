import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { X, Search } from "lucide-react";
import { ArticleStatus, SECTIONS } from "@/types/enums";

interface ArticleFilterBarProps {
  search: string;
  status: string;
  section: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSectionChange: (value: string) => void;
  onReset: () => void;
}

export function ArticleFilterBar({
  search,
  status,
  section,
  onSearchChange,
  onStatusChange,
  onSectionChange,
  onReset,
}: ArticleFilterBarProps) {
  const hasFilters = search || status || section;

  return (
    <Card className="border-primary/20 shadow-sm">
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative sm:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={status || "all"} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {Object.values(ArticleStatus).map((s) => (
                <SelectItem key={s} value={s}>
                  {s.charAt(0) + s.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={section || "all"} onValueChange={onSectionChange}>
            <SelectTrigger>
              <SelectValue placeholder="All sections" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sections</SelectItem>
              {Object.values(SECTIONS).map((s) => (
                <SelectItem key={s.key} value={s.key}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {hasFilters && (
          <div className="mt-4 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="mr-1 h-4 w-4" />
              Clear filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
