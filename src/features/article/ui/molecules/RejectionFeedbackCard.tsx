import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { AlertCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface RejectionFeedbackCardProps {
  reason: string;
  rejectedAt?: string;
}

export function RejectionFeedbackCard({
  reason,
  rejectedAt,
}: RejectionFeedbackCardProps) {
  return (
    <Card className="border-destructive/30 shadow-sm bg-destructive/5">

      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-destructive">
          <AlertCircle className="h-5 w-5" />
          Article Rejected
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            Admin Feedback:
          </p>
          <p className="text-sm text-foreground leading-relaxed">{reason}</p>
        </div>
        {rejectedAt && (
          <p className="text-xs text-muted-foreground">
            Rejected on {formatDate(rejectedAt)}
          </p>
        )}
        <div className="pt-2 border-t border-destructive/20">
          <p className="text-xs text-muted-foreground">
            Please review the feedback, make necessary changes, and resubmit your article.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
