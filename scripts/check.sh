#!/usr/bin/env bash
# La porte du projet, la même en local et en CI : lint/format, typecheck, build,
# le moins cher d'abord, avec la durée de chaque étape.
# Dernière ligne : `check: OK` ou `check: FAILED at step "<step>"`.
# Usage : pnpm check           (porte complète)
#         pnpm check --fast    (saute le build : boucle de travail, la porte
#                               complète reste due avant de pousser)
set -uo pipefail
cd "$(dirname "$0")/.."

fast=0
for arg in "$@"; do
  case $arg in
    --fast) fast=1 ;;
    *) echo "unknown option: $arg" >&2; exit 2 ;;
  esac
done

run_step() {
  local step=$1; shift
  local start=$SECONDS
  echo "== $step"
  if "$@"; then
    echo "-- $step: $((SECONDS - start))s"
  else
    echo "-- $step: failed after $((SECONDS - start))s"
    echo "rerun: $*"
    echo "check: FAILED at step \"$step\""
    exit 1
  fi
}

run_step lint pnpm exec biome ci .
run_step typecheck pnpm exec astro check
if [ $fast = 0 ]; then
  run_step build pnpm exec astro build
fi
echo "check: OK"
