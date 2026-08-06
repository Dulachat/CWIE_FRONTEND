# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

CWIE_FRONTEND is the Next.js (Pages Router, JS/TS mixed) frontend for a CWIE (Cooperative and Work Integrated Education / สหกิจศึกษา) system used by a university's Faculty of Engineering and Industrial Technology. It manages student internship placements, internship diaries, and related reporting across several user roles. UI copy and most domain field names are in Thai.

## Commands

```bash
npm run dev     # start Next.js dev server (http://localhost:3000)
npm run build   # production build
npm run start   # next build && next start
npm run lint    # next lint (config: .eslintrc.json, extends next/core-web-vitals)
```

There is no test suite or test script in this repo.

`server.js` is a standalone custom HTTP server wrapping Next (binds port 3000). It is not referenced by any `package.json` script — the standard flow is `next dev`/`next build && next start`. Treat `server.js` as a legacy/alternate entrypoint unless told otherwise.

## Environment variables

Defined in `.env`:
- `NEXT_PUBLIC_API_URL` — backend API base URL. Used with a trailing slash and string-concatenated with endpoint paths (e.g. `` `${NEXT_PUBLIC_API_URL}auth/login` ``), so keep the trailing slash when setting it.
- `NEXT_PUBLIC_WEB_URL_PRE` — external URL for the separate "เตรียมสหกิจศึกษา" (pre-internship prep) system; pages redirect here with `slug`/`userType` query params.

## Architecture

### Routing / role structure

Next.js Pages Router. Top-level route groups under `pages/` map directly to user roles/areas:
- `pages/admin/` — admin role (`แอดมิน`): user/student/internship/general management.
- `pages/users/` — teacher/advisor and mentor roles (`อาจารย์`, `พี่เลี้ยง`): diary review, evaluation forms (`formInTP_08`, `formInTP_09`).
- `pages/student/` — student role: internship diary entries, maps, profile.
- `pages/auth/` — login, password reset flows.
- `pages/index.js`, `pages/profile.js`, `pages/register.js`, `pages/dashboardReport.js` — shared/root pages. `dashboardReport.js` is the landing page for the executive role (`ผู้บริหาร`).
- `pages/Components/` — shared React components (note the capital `C`, unusual for Next.js convention — do not create a separate lowercase `components/` dir). Contains role-specific Navbars (`Navbar.js` for admin, `DashboardNavbar.js`, `StudentNavbar.js`, `UserNavbar.js`), form components (`FormAdd*`, `FormEdit*`), tab components (`*Tab1`/`*Tab2`), and a Quill-based diary editor (`QuillEditor*`).

### Auth model (client-side only, no middleware)

There is no Next.js middleware or server-side route protection. On login, the full axios response object (not just `response.data`) is JSON-stringified into `localStorage['user']`. Every protected page re-implements the same pattern in `useEffect`:
1. Read `localStorage.getItem('user')`; if absent, `router.push('/auth/login')`.
2. Unwrap to `parsed.data` to get the user record.
3. Derive role from `data.userLevelJoin.level_name` (`"แอดมิน"`, `"อาจารย์"`, `"พี่เลี้ยง"`, `"ผู้บริหาร"`) or from the presence of `data.student_id` (student).
4. Gate rendering / redirect based on that role.

`utils/auth.js` provides `isTokenValid`, `getStoredUser`, and `clearUserSession` helpers (JWT expiry check, safe localStorage read/clear) but most existing pages predate these and inline their own localStorage/role logic instead of calling them. Prefer the `utils/auth.js` helpers in new/changed code rather than copying the inline pattern.

Logout is a plain `localStorage.clear()` + redirect to `/auth/login` (see `pages/Components/Navbar.js`).

### API calls

Two coexisting patterns in the codebase:
- **Preferred**: `utils/axios.ts` exports `axiosInstance`, an axios instance pre-configured with `baseURL: NEXT_PUBLIC_API_URL`. Use this for new code (see `utils/exportpdf.js` for an example).
- **Legacy**: many components build a raw axios request per-call with `process.env.NEXT_PUBLIC_API_URL + '<endpoint>'` and manual `config` objects (see `pages/auth/login.js`, `pages/Components/FormAddDiary.js`). Don't propagate this pattern into new code; prefer `axiosInstance`.

Long-running server-side jobs (e.g. PDF export) follow a submit-then-poll pattern: POST to start a job, poll a status endpoint on an interval until `status === 'ready'`, then GET the file as a blob and trigger a browser download. See `utils/exportpdf.js` (`ExportFile`) as the reference implementation for any similar async export feature.

### UI stack

- **Ant Design (`antd`)** is the primary component library (`Card`, `Form`, `Table`, `message`, icons from `@ant-design/icons`).
- **Tailwind CSS** utility classes are used throughout for layout/spacing on top of antd components.
- **Headless UI + Heroicons** appear in a few components carried over from a Tailwind UI starter (e.g. `Navbar.js`'s disclosure/menu pattern) — not the dominant pattern, don't default to it for new UI.
- **react-quill** is used for rich-text diary entries (`QuillEditor*.js` components); its stylesheet is imported globally in `pages/_app.js`.

### TypeScript

The project is primarily JS (`.js` pages/components) with a handful of `.ts` files (e.g. `utils/axios.ts`). `tsconfig.json` has `strict: false`. There's no enforced convention to write new files in TS — match the file type of whatever you're editing.
