# justfile per HRAssistant

# Mostra tutti i comandi disponibili
default:
    @just --list

# Costruisce le immagini Docker
build:
    docker-compose build

# Costruisce le immagini senza cache
build-no-cache:
    docker-compose build --no-cache

# Avvia i container in background
up:
    docker-compose up -d

# Avvia i container e mostra i log
up-logs:
    docker-compose up

# Ferma i container
down:
    docker-compose down

# Ferma i container e rimuove i volumi
volume-down:
    docker-compose down -v

# Ferma i container, rimuove volumi e immagini
clean:
    docker-compose down -v --rmi all

# Mostra i log
logs:
    docker-compose logs -f

# Mostra i log solo del frontend
logs-frontend:
    docker-compose logs -f frontend

# Mostra lo stato dei container
ps:
    docker-compose ps

# Riavvia i container
restart:
    docker-compose restart

# Ricostruisce e riavvia i container
rebuild:
    just down
    just build
    just up

# Ricostruisce senza cache e riavvia
rebuild-clean:
    just volume-down
    just build-no-cache
    just up

# Apre una shell nel container frontend
shell:
    docker-compose exec frontend sh

# Mostra le statistiche dei container
stats:
    docker stats $(docker-compose ps -q)

# Esegue il linting del codice (localmente)
lint:
    npm run lint

# Esegue il type checking (localmente)
type-check:
    npm run type-check

# Avvia il server di sviluppo (localmente)
dev:
    npm run dev

# Avvia il server di sviluppo con Docker (con hot-reload)
dev-up:
    docker-compose -f docker-compose.dev.yml up -d

# Ferma il server di sviluppo Docker
dev-down:
    docker-compose -f docker-compose.dev.yml down

# Mostra i log del server di sviluppo Docker
dev-logs:
    docker-compose -f docker-compose.dev.yml logs -f

# Ricostruisce il container di sviluppo
dev-rebuild:
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml build
    docker-compose -f docker-compose.dev.yml up -d

# Costruisce il progetto (localmente)
build-local:
    npm run build

# Pulisce completamente tutto (container, volumi, immagini, node_modules)
clean-all:
    just volume-down
    docker system prune -f
    rm -rf node_modules dist

# Controlla la salute del container
health:
    curl -f http://localhost:3000/health || echo "Container non raggiungibile"
