"use client";

import Link from "next/link";
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
  const stats = {
    total: totalCount,
    pending: articles.filter((a) => a.status === "PENDING").length,
    approved: articles.filter((a) => a.status === "APPROVED").length,
    rejected: articles.filter((a) => a.status === "REJECTED").length,
    draft: articles.filter((a) => a.status === "DRAFT").length,
  };

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
            className="shadow-md hover:shadow-lg"
            style={{
              backgroundColor: 'hsl(var(--color-primary))',
              color: 'white'
            }}
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
        <Card
          className="group relative overflow-hidden shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: 'hsl(var(--color-primary) / 0.2)' }}
        >
          <div
            className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full transition-transform group-hover:scale-110"
            style={{ backgroundColor: 'hsl(var(--color-primary) / 0.1)' }}
          />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              Total Articles
            </CardTitle>
            <div className="rounded-lg p-2" style={{ backgroundColor: 'hsl(var(--color-primary) / 0.1)' }}>
              <FileText className="h-5 w-5" style={{ color: 'hsl(var(--color-primary))' }} />
            </div>
          </CardHeader>
          <CardContent className="relative">
            {loading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold" style={{ color: 'hsl(var(--color-primary))' }}>
                  {stats.total}
                </div>
                <p className="mt-1 text-xs" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                  All content in system
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Pending Review - Yellow/Warning */}
        <Card
          className="group relative overflow-hidden shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: 'hsl(45 93% 47% / 0.2)' }}
        >
          <div
            className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full transition-transform group-hover:scale-110"
            style={{ backgroundColor: 'hsl(45 93% 47% / 0.1)' }}
          />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              Pending Review
            </CardTitle>
            <div className="rounded-lg p-2" style={{ backgroundColor: 'hsl(45 93% 47% / 0.1)' }}>
              <Clock className="h-5 w-5" style={{ color: 'hsl(45 93% 37%)' }} />
            </div>
          </CardHeader>
          <CardContent className="relative">
            {loading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold" style={{ color: 'hsl(45 93% 37%)' }}>
                  {stats.pending}
                </div>
                <p className="mt-1 text-xs" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                  Awaiting approval
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Approved - Secondary Green */}
        <Card
          className="group relative overflow-hidden shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: 'hsl(var(--color-secondary) / 0.2)' }}
        >
          <div
            className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full transition-transform group-hover:scale-110"
            style={{ backgroundColor: 'hsl(var(--color-secondary) / 0.1)' }}
          />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              Approved
            </CardTitle>
            <div className="rounded-lg p-2" style={{ backgroundColor: 'hsl(var(--color-secondary) / 0.1)' }}>
              <CheckCircle2 className="h-5 w-5" style={{ color: 'hsl(var(--color-secondary))' }} />
            </div>
          </CardHeader>
          <CardContent className="relative">
            {loading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold" style={{ color: 'hsl(var(--color-secondary))' }}>
                  {stats.approved}
                </div>
                <p className="mt-1 text-xs" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                  Published articles
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Rejected - Destructive */}
        <Card
          className="group relative overflow-hidden shadow-sm transition-all hover:shadow-md"
          style={{ borderColor: 'hsl(var(--color-destructive) / 0.2)' }}
        >
          <div
            className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full transition-transform group-hover:scale-110"
            style={{ backgroundColor: 'hsl(var(--color-destructive) / 0.1)' }}
          />
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              Rejected
            </CardTitle>
            <div className="rounded-lg p-2" style={{ backgroundColor: 'hsl(var(--color-destructive) / 0.1)' }}>
              <XCircle className="h-5 w-5" style={{ color: 'hsl(var(--color-destructive))' }} />
            </div>
          </CardHeader>
          <CardContent className="relative">
            {loading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <>
                <div className="text-3xl font-bold" style={{ color: 'hsl(var(--color-destructive))' }}>
                  {stats.rejected}
                </div>
                <p className="mt-1 text-xs" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
                  Needs revision
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Enhanced Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card
          className="group relative overflow-hidden shadow-sm transition-all hover:shadow-lg"
          style={{
            borderColor: 'hsl(var(--color-primary) / 0.2)',
            background: 'linear-gradient(135deg, hsl(var(--color-primary) / 0.05) 0%, hsl(var(--color-primary) / 0.1) 100%)'
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="rounded-lg p-2" style={{ backgroundColor: 'hsl(var(--color-primary) / 0.2)' }}>
                <Clock className="h-5 w-5" style={{ color: 'hsl(var(--color-primary))' }} />
              </div>
              Review Pending
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              {stats.pending} article{stats.pending !== 1 ? "s" : ""} waiting
              for your review
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full hover:shadow-sm"
              style={{
                borderColor: 'hsl(var(--color-primary) / 0.3)',
                color: 'hsl(var(--color-primary))'
              }}
            >
              <Link href="/admin/pending">
                View Pending
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card
          className="group relative overflow-hidden shadow-sm transition-all hover:shadow-lg"
          style={{
            borderColor: 'hsl(var(--color-secondary) / 0.2)',
            background: 'linear-gradient(135deg, hsl(var(--color-secondary) / 0.05) 0%, hsl(var(--color-secondary) / 0.1) 100%)'
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="rounded-lg p-2" style={{ backgroundColor: 'hsl(var(--color-secondary) / 0.2)' }}>
                <Users className="h-5 w-5" style={{ color: 'hsl(var(--color-secondary))' }} />
              </div>
              Manage Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              View and manage all user accounts
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full hover:shadow-sm"
              style={{
                borderColor: 'hsl(var(--color-secondary) / 0.3)',
                color: 'hsl(var(--color-secondary))'
              }}
            >
              <Link href="/admin/users">
                View Users
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card
          className="group relative overflow-hidden shadow-sm transition-all hover:shadow-lg"
          style={{
            borderColor: 'hsl(var(--color-primary) / 0.2)',
            background: 'linear-gradient(135deg, hsl(var(--color-primary) / 0.1) 0%, hsl(var(--color-secondary) / 0.1) 100%)'
          }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="rounded-lg p-2" style={{ backgroundColor: 'hsl(var(--color-primary) / 0.2)' }}>
                <FileText className="h-5 w-5" style={{ color: 'hsl(var(--color-primary))' }} />
              </div>
              All Articles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm" style={{ color: 'hsl(var(--color-muted-foreground))' }}>
              Browse and manage all content
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full hover:shadow-sm"
              style={{
                borderColor: 'hsl(var(--color-primary) / 0.3)',
                color: 'hsl(var(--color-primary))'
              }}
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
        <CardHeader
          className="border-b"
          style={{
            borderColor: 'hsl(var(--color-border))',
            backgroundColor: 'hsl(var(--color-muted) / 0.3)'
          }}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              Recent Articles
            </CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/articles" style={{ color: 'hsl(var(--color-primary))' }}>
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
