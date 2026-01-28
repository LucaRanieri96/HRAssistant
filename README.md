# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Docker Setup

Il progetto include il supporto completo per Docker con configurazioni sia per produzione che per sviluppo.

### Prerequisiti

- [Docker](https://docs.docker.com/get-docker/) e Docker Compose installati
- [just](https://github.com/casey/just) command runner installato (opzionale ma raccomandato)

Per installare just:
```sh
# Su Linux/macOS con Homebrew
brew install just

# Su Linux con cargo
cargo install just

# Su Arch Linux
pacman -S just
```

### Comandi Just Disponibili

Visualizza tutti i comandi disponibili:
```sh
just
```

#### Comandi per Produzione

```sh
# Costruisce le immagini Docker
just build

# Costruisce le immagini senza cache
just build-no-cache

# Avvia i container in background
just up

# Avvia i container e mostra i log
just up-logs

# Ferma i container
just down

# Ferma i container e rimuove i volumi
just volume-down

# Ferma i container, rimuove volumi e immagini
just clean

# Mostra i log
just logs

# Mostra i log solo del frontend
just logs-frontend

# Mostra lo stato dei container
just ps

# Riavvia i container
just restart

# Ricostruisce e riavvia i container
just rebuild

# Ricostruisce senza cache e riavvia
just rebuild-clean

# Apre una shell nel container frontend
just shell

# Mostra le statistiche dei container
just stats

# Controlla la salute del container
just health

# Pulisce completamente tutto
just clean-all
```

#### Esempio di utilizzo tipico

```sh
# Prima build e avvio
just build
just up

# Il frontend sarà disponibile su http://localhost:3000

# Vedere i log
just logs

# Fermare tutto
just down

# Ricostruire dopo modifiche
just rebuild
```

### Docker Manuale (senza just)

Se preferisci usare direttamente Docker Compose:

```sh
# Build
docker-compose build

# Start
docker-compose up -d

# Stop
docker-compose down

# Stop e rimuovi volumi
docker-compose down -v

# Logs
docker-compose logs -f
```

### Ambiente di Sviluppo con Docker

Per sviluppare con hot-reload in Docker:

```sh
# Con just
just dev-up  # (nota: questo comando va aggiunto al justfile se necessario)

# Manualmente
docker-compose -f docker-compose.dev.yml up
```

Il server di sviluppo sarà disponibile su http://localhost:5173
