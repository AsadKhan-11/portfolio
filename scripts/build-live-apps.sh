#!/usr/bin/env bash
#
# Rebuilds the two front-end-only apps behind the case studies (Ironside and
# Vector Academy) as static sites and copies them into public/live/, so the
# "Try it" section on their case pages can show the running app from this
# site's own domain: no second deployment, no login, nothing to keep alive.
#
# It builds a copy, never the project itself: the copy gets a config that
# exports static files under /live/<name>, and the original repositories are
# not touched. Run it whenever either app changes, then commit public/live.
#
#   npm run live:build
#
# Needs both projects checked out next to this one (or point IRONSIDE_SRC and
# VECTOR_SRC at them) with their dependencies installed. Webpack is used
# because the copy reaches the original's node_modules through a symlink,
# which Turbopack refuses to follow.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IRONSIDE_SRC="${IRONSIDE_SRC:-$ROOT/../ironside-gym}"
VECTOR_SRC="${VECTOR_SRC:-$ROOT/../Vector-Academy}"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

build() {
  local name="$1" src
  src="$(cd "$2" && pwd)"

  rsync -a --exclude node_modules --exclude .next --exclude out --exclude captures \
    --exclude .git --exclude reference "$src/" "$WORK/$name/"
  ln -s "$src/node_modules" "$WORK/$name/node_modules"

  cat > "$WORK/$name/next.config.ts" <<CONFIG
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/live/$name",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
CONFIG

  (cd "$WORK/$name" && npx next build --webpack)

  rm -rf "$ROOT/public/live/$name"
  mkdir -p "$ROOT/public/live/$name"
  cp -R "$WORK/$name/out/." "$ROOT/public/live/$name/"
  echo "built public/live/$name ($(du -sh "$ROOT/public/live/$name" | cut -f1))"
}

build ironside-gym "$IRONSIDE_SRC"
build vector-academy "$VECTOR_SRC"
