"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { UserCircle, Mail, Briefcase, FileText, Shield } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="rounded-lg p-2 shadow-sm"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--color-primary)) 0%, hsl(var(--color-secondary)) 100%)",
          }}
        >
          <UserCircle className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "hsl(var(--color-foreground))" }}
          >
            My Profile
          </h1>
          <p style={{ color: "hsl(var(--color-muted-foreground))" }}>
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card
          className="md:col-span-1"
          style={{
            borderColor: "hsl(var(--color-primary) / 0.2)",
            backgroundColor: "hsl(var(--color-card))",
          }}
        >
          <CardHeader
            className="border-b"
            style={{
              borderColor: "hsl(var(--color-border))",
              background:
                "linear-gradient(135deg, hsl(var(--color-primary) / 0.05) 0%, hsl(var(--color-secondary) / 0.05) 100%)",
            }}
          >
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4 pt-6">
            <Avatar
              className="h-32 w-32 border-4 shadow-lg"
              style={{
                borderColor: "hsl(var(--color-primary))",
              }}
            >
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback
                className="text-4xl font-bold"
                style={{
                  backgroundColor: "hsl(var(--color-primary) / 0.1)",
                  color: "hsl(var(--color-primary))",
                }}
              >
                AD
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3
                className="text-lg font-semibold"
                style={{ color: "hsl(var(--color-foreground))" }}
              >
                Admin User
              </h3>
              <p
                className="text-sm"
                style={{ color: "hsl(var(--color-muted-foreground))" }}
              >
                admin@uttrakhandnews.com
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="md:col-span-2">
          <CardHeader
            className="border-b"
            style={{ borderColor: "hsl(var(--color-border))" }}
          >
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserCircle
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "hsl(var(--color-muted-foreground))" }}
                  />
                  <Input
                    id="name"
                    defaultValue="Admin User"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "hsl(var(--color-muted-foreground))" }}
                  />
                  <Input
                    id="email"
                    type="email"
                    defaultValue="admin@uttrakhandnews.com"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profession">Profession</Label>
                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "hsl(var(--color-muted-foreground))" }}
                  />
                  <Input
                    id="profession"
                    defaultValue="Administrator"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="relative">
                  <Shield
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                    style={{ color: "hsl(var(--color-primary))" }}
                  />
                  <Input
                    id="role"
                    defaultValue="ADMIN"
                    disabled
                    className="pl-9"
                    style={{
                      backgroundColor: "hsl(var(--color-primary) / 0.05)",
                      color: "hsl(var(--color-primary))",
                    }}
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
                defaultValue="Administrator of Uttrakhand News platform."
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline">Cancel</Button>
              <Button
                style={{
                  backgroundColor: "hsl(var(--color-primary))",
                  color: "white",
                }}
                className="shadow-md hover:shadow-lg"
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          className="border-l-4"
          style={{
            borderLeftColor: "hsl(var(--color-primary))",
            backgroundColor: "hsl(var(--color-card))",
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="rounded-lg p-3"
                style={{
                  backgroundColor: "hsl(var(--color-primary) / 0.1)",
                }}
              >
                <FileText
                  className="h-6 w-6"
                  style={{ color: "hsl(var(--color-primary))" }}
                />
              </div>
              <div>
                <p
                  className="text-sm"
                  style={{ color: "hsl(var(--color-muted-foreground))" }}
                >
                  Total Articles
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "hsl(var(--color-primary))" }}
                >
                  0
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-l-4"
          style={{
            borderLeftColor: "hsl(var(--color-secondary))",
            backgroundColor: "hsl(var(--color-card))",
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="rounded-lg p-3"
                style={{
                  backgroundColor: "hsl(var(--color-secondary) / 0.1)",
                }}
              >
                <Shield
                  className="h-6 w-6"
                  style={{ color: "hsl(var(--color-secondary))" }}
                />
              </div>
              <div>
                <p
                  className="text-sm"
                  style={{ color: "hsl(var(--color-muted-foreground))" }}
                >
                  Account Status
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "hsl(var(--color-secondary))" }}
                >
                  Active
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-l-4 sm:col-span-2"
          style={{
            borderLeftColor: "hsl(var(--color-primary))",
            backgroundColor: "hsl(var(--color-card))",
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div
                className="rounded-lg p-3"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--color-primary)) 0%, hsl(var(--color-secondary)) 100%)",
                }}
              >
                <UserCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p
                  className="text-sm"
                  style={{ color: "hsl(var(--color-muted-foreground))" }}
                >
                  Member Since
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: "hsl(var(--color-foreground))" }}
                >
                  January 2024
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
