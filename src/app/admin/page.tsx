"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { ArticlesTable } from "@/features/article/ui/organisms/ArticlesTable";
import { useArticles } from "@/features/article/hooks/useArticles";
import { Skeleton } from "@/ui/skeleton";
import { PageHeader } from "@/components/molecules/PageHeader";

export default function AdminDashboardPage() {
  const { articles, loading, totalCount } = useArticles({
    search: "",
    status: "",
    section: "",
  });

  // Calculate statistics
  const stats = useMemo(
    () => ({
      total: totalCount,
      pending: articles.filter((a) => a.status === "PENDING").length,
      approved: articles.filter((a) => a.status === "APPROVED").length,
      rejected: articles.filter((a) => a.status === "REJECTED").length,
      draft: articles.filter((a) => a.status === "DRAFT").length,
    }),
    [articles, totalCount]
  );

  const recentArticles = articles.slice(0, 5);

  return (
    <div className="space-y-8">
      <PageHeader
        icon={Sparkles}
        title="Admin Dashboard"
        subtitle="Welcome back! Here's what's happening with your content today."
        colorScheme="primary"
        actionButton={
          <Button
            asChild
            size="lg"
            className="btn-primary-action shadow-md transition-all hover:shadow-lg"
          >
            <Link href="/admin/articles/create">
              <Plus className="mr-2 h-5 w-5" />
              Create New Article
            </Link>
          </Button>
        }
      />

      {/* Statistics Grid with Enhanced Design */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Articles - Primary Blue */}
        <Card className="stat-card-primary group relative overflow-hidden transition-all hover:shadow-md">
          <div className="icon-bg-primary absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full transition-transform group-hover:scale-110" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Articles
            </CardTitle>
            <div className="icon-bg-primary rounded-lg p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            {loading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold text-primary">
                  {stats.total}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  All content in system
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pending Review - Yellow/Warning */}
        <Card className="stat-card-warning group relative overflow-hidden transition-all hover:shadow-md">
          <div className="stat-warning-accent absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full transition-transform group-hover:scale-110" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
            <div className="stat-warning-accent rounded-lg p-2">
              <Clock className="h-5 w-5 stat-warning-text" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            {loading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold stat-warning-text">
                  {stats.pending}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Awaiting approval
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Approved - Secondary Green */}
        <Card className="stat-card-secondary group relative overflow-hidden transition-all hover:shadow-md">
          <div className="icon-bg-secondary absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full transition-transform group-hover:scale-110" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved
            </CardTitle>
            <div className="icon-bg-secondary rounded-lg p-2">
              <CheckCircle2 className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            {loading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold text-secondary">
                  {stats.approved}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Published articles
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Rejected - Destructive */}
        <Card className="stat-card-destructive group relative overflow-hidden transition-all hover:shadow-md">
          <div className="bg-destructive-10 absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full transition-transform group-hover:scale-110" />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejected
            </CardTitle>
            <div className="bg-destructive-10 rounded-lg p-2">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            {loading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold text-destructive">
                  {stats.rejected}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Needs revision
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Enhanced Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-primary-subtle group relative overflow-hidden shadow-sm transition-all hover:shadow-lg bg-gradient-primary-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="icon-bg-primary-light rounded-lg p-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              Review Pending
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {stats.pending} article{stats.pending !== 1 ? "s" : ""} waiting
              for your review
            </p>
            <Button
              asChild
              variant="outline"
              className="border-primary-light text-primary w-full hover:shadow-sm"
            >
              <Link href="/admin/pending">
                View Pending
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-secondary-subtle group relative overflow-hidden shadow-sm transition-all hover:shadow-lg bg-gradient-secondary-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="icon-bg-secondary-light rounded-lg p-2">
                <Users className="h-5 w-5 text-secondary" />
              </div>
              Manage Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              View and manage all user accounts
            </p>
            <Button
              asChild
              variant="outline"
              className="border-secondary-light text-secondary w-full hover:shadow-sm"
            >
              <Link href="/admin/users">
                View Users
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary-subtle group relative overflow-hidden shadow-sm transition-all hover:shadow-lg bg-gradient-mixed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="icon-bg-primary-light rounded-lg p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              All Articles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Browse and manage all content
            </p>
            <Button
              asChild
              variant="outline"
              className="border-primary-light text-primary w-full hover:shadow-sm"
            >
              <Link href="/admin/articles">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <Card className="shadow-sm">
        <CardHeader className="border-b border-border bg-muted-light">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              Recent Articles
            </CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/articles" className="text-primary">
                View All
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ArticlesTable
            articles={recentArticles}
            loading={loading}
            showActions={true}
          />
        </CardContent>
      </Card>
    </div>
  );
}
