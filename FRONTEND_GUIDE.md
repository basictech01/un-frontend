
# 🏔️ Hills-Quills Frontend Guidelines

**(GraphQL + Atomic Design + Feature-Driven UI)**

> This document defines **how frontend code MUST be written** in this project.
> It is optimized for **human devs and coding LLMs (Cursor)**.

---

## 1. Core Principles (NON-NEGOTIABLE)

### 1.1 Architecture Flow

```
UI  →  Hooks  →  Data (GraphQL)
```

* UI components NEVER fetch data
* Hooks NEVER render UI
* GraphQL NEVER appears in UI files

---

### 1.2 What this project is

* Editorial / News platform
* GraphQL backend
* Content-driven UI
* Few public pages, role-based dashboards

---

## 2. Folder Structure (FINAL)

```txt
src/
├── app/                                  # NEXT.JS ROUTES (PAGES ONLY)
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Home page
│   │
│   ├── section/
│   │   └── [section]/
│   │       └── page.tsx                  # Section-wise articles
│   │
│   ├── articles/
│   │   └── [id]/
│   │       └── page.tsx                  # Article detail page
│   │
│   ├── search/
│   │   └── page.tsx                      # Search page
│   │
│   ├── about/
│   │   └── page.tsx                      # About us
│   │
│   ├── login/
│   │   └── page.tsx                      # Login selector
│   │
│   ├── admin/
│   │   ├── layout.tsx
│   │   └── page.tsx                      # Admin dashboard
│   │
│   └── author/
│       ├── layout.tsx
│       └── page.tsx                      # Author dashboard
│
├── ui/                                   # 🔹 ATOMS (PURE UI)
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── Skeleton.tsx
│   ├── Modal.tsx
│   ├── Spinner.tsx
│   └── Typography.tsx
│
├── features/                             # 🧠 FEATURE OWNERSHIP
│
│   ├── article/                          # CORE FEATURE
│   │   ├── ui/
│   │   │   ├── molecules/                # 🧩 MOLECULES
│   │   │   │   ├── ArticleCard.tsx
│   │   │   │   ├── ArticleMeta.tsx
│   │   │   │   ├── ArticleAuthor.tsx
│   │   │   │   └── ArticleTags.tsx
│   │   │   │
│   │   │   ├── organisms/                # 🧬 ORGANISMS
│   │   │   │   ├── ArticleGrid.tsx
│   │   │   │   ├── ArticleList.tsx
│   │   │   │   ├── ArticleDetail.tsx
│   │   │   │   └── FeaturedArticles.tsx
│   │   │   │
│   │   │   └── templates/                # 📐 TEMPLATES
│   │   │       └── ArticlePageLayout.tsx
│   │   │
│   │   ├── hooks/                        # UI → HOOKS
│   │   │   ├── useArticles.ts
│   │   │   ├── useArticle.ts
│   │   │   ├── useTrendingArticles.ts
│   │   │   └── useSearchArticles.ts
│   │   │
│   │   ├── data/                         # HOOKS → DATA (GRAPHQL)
│   │   │   ├── article.fragments.ts
│   │   │   ├── article.queries.ts
│   │   │   └── article.mutations.ts
│   │   │
│   │   └── types.ts                      # Article TS types
│
│   ├── auth/                             # AUTH FEATURE (ADMIN + AUTHOR ROLES)
│   │   ├── ui/
│   │   │   ├── molecules/
│   │   │   │   └── LoginForm.tsx
│   │   │   │
│   │   │   └── organisms/
│   │   │       └── AuthGuard.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   │
│   │   ├── data/
│   │   │   └── auth.mutations.ts
│   │   │
│   │   └── types.ts
│
├── graphql/                              # ⚙️ GRAPHQL INFRA
│   ├── client.ts                        # Apollo Client setup
│   ├── cache.ts                         # Apollo cache config
│   └── errorPolicy.ts                   # Error handling strategy
│
├── providers/                           # GLOBAL PROVIDERS
│   └── ApolloProvider.tsx
│
├── hooks/                               # GLOBAL HOOKS (RARE)
│   ├── useMediaQuery.ts
│   └── useDebounce.ts
│
├── types/                               # GLOBAL TYPES
│   ├── common.ts
│   └── enums.ts
│
└── styles/                              # GLOBAL STYLES
    └── globals.css
 one think I can suggest is that the difference between molecule and organism, what I would like to have is organisms are something which also have some business logic ,like a form is a organism but an article grid is probably not
 its just something I use, so an organism also have a hook , if you don't need a custom hook for a component its probably an molecule
```

---

## 3. Atomic Design Rules (VERY IMPORTANT)

### 3.1 Atoms (`src/ui`)

**Definition:**
Pure UI primitives with **no business meaning**.

Examples:

* Button
* Card
* Badge
* Input
* Avatar

Rules:

* ❌ No hooks
* ❌ No GraphQL
* ❌ No domain meaning
* ✅ Reusable everywhere

---

### 3.2 Molecules (`features/*/ui/molecules`)

**Definition:**
A molecule represents **ONE meaningful thing**.

Examples:

* `ArticleCard` → one article
* `ArticleAuthor` → one author
* `LoginForm` → one login form

Rules:

* ❌ No looping
* ❌ No data fetching
* ❌ No custom hooks
* ✅ Accepts props
* ✅ Uses atoms
* ✅ Contains conditional UI logic

👉 **If a component does NOT need a custom hook → it is a Molecule**

---

### 3.3 Organisms (`features/*/ui/organisms`)

**Definition:**
An organism is a **composition unit** that may include **business/UI logic**.

Examples:

* `ArticleGrid`
* `ArticleDetail`
* `AuthGuard`
* Complex forms

Rules:

* ✅ Can loop
* ✅ Can manage UI state (loading / empty)
* ✅ Can use **custom hooks**
* ❌ Still does NOT fetch GraphQL directly
* ❌ Does NOT define routes

👉 **If a component needs a custom hook → it is an Organism**

---

### 3.4 Templates (`features/*/ui/templates`)

**Definition:**
Layout scaffolding for pages.

Examples:

* `ArticlePageLayout`

Rules:

* ❌ No data fetching
* ❌ No business logic
* ✅ Only layout & slots

---

### 3.5 Pages (`src/app`)

Pages:

* compose organisms
* call hooks
* pass props
* NEVER contain reusable UI

---

## 4. Feature Structure Example (Article)

```txt
features/article/
├── ui/
│   ├── molecules/
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleMeta.tsx
│   │   └── ArticleAuthor.tsx
│   │
│   ├── organisms/
│   │   ├── ArticleGrid.tsx
│   │   ├── ArticleDetail.tsx
│   │   └── FeaturedArticles.tsx
│   │
│   └── templates/
│       └── ArticlePageLayout.tsx
│
├── hooks/
│   ├── useArticles.ts
│   ├── useArticle.ts
│   └── useTrendingArticles.ts
│
├── data/
│   ├── article.fragments.ts
│   ├── article.queries.ts
│   └── article.mutations.ts
│
└── types.ts
```

---

## 5. Hooks Rules

* Hooks live inside the **feature**
* Hooks are the ONLY place that:

  * talk to GraphQL
  * transform data
  * handle pagination / params

Example:

```ts
useArticles({ section, tag })
```

---

## 6. GraphQL Rules

* GraphQL files live ONLY in `features/*/data`
* Use fragments aggressively
* UI must NEVER know query structure

---

## 7. Admin & Author Rules

* Admin and Author are **roles**, not features
* No separate `admin` feature folder
* Same UI reused with role-based behavior
* Routing decides access, not component duplication

---

## 8. Using Stitch UI Code (`/uicode`)

### 8.1 Source of Truth

* `uicode/` contains HTML + CSS + JS from Stitch
* This is **visual reference only**

### 8.2 How to convert

* Break HTML into:

  * atoms → molecules → organisms
* Replace CSS with Tailwind classes
* Remove inline styles

---

## 9. Styling Rules (STRICT)

### 9.1 Tailwind ONLY

* ❌ No inline styles
* ❌ No hardcoded colors
* ❌ No hardcoded fonts

### 9.2 Global Tokens

All colors & fonts must come from:

```ts
tailwind.config.js
```

Example:

```ts
theme: {
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)'
  }
}
```

Use:

```tsx
className="bg-primary text-secondary"
```

### 9.3 Text Size Scale (NO ARBITRARY SIZES)

Always use Tailwind's standard text scale. Never use arbitrary pixel values.

| Instead of       | Use         |
| ---------------- | ----------- |
| `text-[9px]`     | `text-xs`   |
| `text-[10px]`    | `text-xs`   |
| `text-[11px]`    | `text-xs`   |
| `text-[13px]`    | `text-sm`   |
| `text-[15px]`    | `text-sm`   |

```tsx
// ❌ Wrong
<p className="text-[11px]">...</p>

// ✅ Correct
<p className="text-xs">...</p>
```

### 9.4 Responsive Units

* ❌ Never use `px` for `min-height` on full-section containers
* ✅ Use viewport units so it scales across screen sizes

```tsx
// ❌ Wrong — breaks on small screens
className="h-[82vh] min-h-[600px]"

// ✅ Correct
className="h-[82vh] min-h-[60vh]"
```

---

## 14. Image Rules (`next/image`)

### 14.1 `fill` vs explicit `width`/`height` — pick ONE

Never provide both a sized parent container AND explicit `width`/`height` on the Image.

**Use `fill`** when the image must fill a shaped container (aspect-ratio boxes, hero banners):
```tsx
// Parent MUST have `relative` + explicit dimensions
<div className="relative w-full aspect-[16/10] overflow-hidden">
  <Image src={src} alt={alt} fill className="object-cover" sizes="..." />
</div>
```

**Use `width`/`height`** for fixed-size images (avatars, thumbnails, logos):
```tsx
// No explicit sizing needed on the parent div
<div className="rounded-lg overflow-hidden">
  <Image src={src} alt={alt} width={80} height={96} className="object-cover" />
</div>
```

### 14.2 `sizes` prop

Always set `sizes` when using `fill` to help the browser pick the right source:
```tsx
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
```
Not needed when using explicit `width`/`height`.

### 14.3 Placeholder / fallback images

For content that may not have an image yet, use picsum with a stable seed so the image is consistent per item:
```tsx
src={article.cover_image ?? `https://picsum.photos/seed/${article.id}/800/500`}
```

---

## 10. Decision Cheatsheet (PRINT THIS)

| Question           | Answer   |
| ------------------ | -------- |
| One item UI?       | Molecule |
| Many items layout? | Organism |
| Needs a hook?      | Organism |
| Pure UI?           | Atom     |
| Fetches data?      | Hook     |
| Route logic?       | Page     |

---

## 11. What NOT to do

❌ GraphQL in UI
❌ Hooks inside atoms/molecules
❌ Hardcoded colors
❌ Business logic in pages
❌ Duplicate admin/author UI
❌ Giant "components" folder
❌ Arbitrary text sizes (`text-[11px]`, `text-[13px]`) — use the Tailwind scale
❌ `px` values for responsive min-height — use `vh`
❌ Both `fill` AND explicit `width`/`height` on `next/image` — pick one
❌ `array[0] as T | undefined` — use `array.at(0)`
❌ Returning `null`/`undefined` arrays from hooks — always `?? []`

---

## 12. Loading States (Himalayan Animation)

Use the brand-aligned `FullScreenLoader` and `UNLoader` components for all loading states:

**Full-page loading**: `import { FullScreenLoader } from "@/components/organisms"`
**Inline loading**: `import { UNLoader } from "@/components/organisms"`

Features 3-layer parallax mountains, flowing river, pine trees, animated UN logo, and floating particles. All pure CSS for performance. Use `<FullScreenLoader message="..." />` for page transitions and `<UNLoader />` for inline sections.

---

## 15. TypeScript Patterns

### 15.1 Safe array access

Use `.at(0)` instead of index `[0]` when the element may not exist. `.at()` natively returns `T | undefined`; index access does not without `noUncheckedIndexedAccess`.

```ts
// ❌ Wrong — TypeScript thinks this is always Article, not Article | undefined
const featured = articles[0] as (typeof articles)[0] | undefined;

// ✅ Correct — type is Article | undefined with no cast
const featured = articles.at(0);
```

### 15.2 Loading state contract for hooks

Every data hook must guarantee a safe empty state so components never receive `null` or `undefined` arrays. Use `?? []` as the fallback:

```ts
const articles = data?.articles.edges.map((e) => e.node) ?? [];
return { articles, loading, error };
```

Components then check `loading` for skeleton display and work with a guaranteed array — they never need to null-check.

---

## 13. Final Rule (MOST IMPORTANT)

> **Meaning lives in Molecules
> Structure lives in Organisms
> Data lives in Hooks
> Graph lives in Data**

If this rule is followed, the codebase stays clean forever.

