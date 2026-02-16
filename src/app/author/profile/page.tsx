"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { UserCircle, Mail, Briefcase, FileText, Shield, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMyArticles } from "@/features/article/hooks/useMyArticles";
import { getInitials, formatDate } from "@/lib/utils";
import { ArticleStatus } from "@/types/enums";

export default function AuthorProfilePage() {
  const { user } = useAuth();
  const { articles, totalCount } = useMyArticles();

  const approvedCount = articles.filter(
    (a) => a.status === ArticleStatus.APPROVED
  ).length;

  const initials = user?.name ? getInitials(user.name) : "?";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-lg p-2 shadow-sm bg-gradient-mixed">
          <UserCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1 border-primary-subtle bg-card">
          <CardHeader className="border-b border-border bg-gradient-primary-soft">
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 pt-6">
            <Avatar className="h-32 w-32 border-4 border-primary shadow-lg">
              <AvatarImage src={user?.profile_photo ?? undefined} />
              <AvatarFallback className="text-4xl font-bold bg-primary-ultra-light text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">
                {user?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="w-full rounded-md bg-muted/50 p-3 text-center">
              <p className="text-xs text-muted-foreground">
                Avatar is managed by admin
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="md:col-span-2">
          <CardHeader className="border-b border-border">
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    defaultValue={user?.name}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="profession"
                    defaultValue={user?.profession ?? ""}
                    placeholder="e.g. Journalist, Writer"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
                  <Input
                    id="role"
                    defaultValue="AUTHOR"
                    disabled
                    className="pl-9 bg-primary-ultra-light text-primary"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                placeholder="Tell us about yourself..."
                defaultValue={user?.bio ?? ""}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button className="btn-primary-action shadow-md hover:shadow-lg">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg p-3 icon-bg-primary">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Articles</p>
                <p className="text-2xl font-bold text-primary">{totalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg p-3 icon-bg-secondary">
                <CheckCircle2 className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Approved Articles
                </p>
                <p className="text-2xl font-bold text-secondary">
                  {approvedCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary bg-card sm:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-lg p-3 bg-gradient-mixed">
                <UserCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-2xl font-bold text-foreground">
                  {user?.created_at
                    ? formatDate(user.created_at)
                    : "Unknown"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
