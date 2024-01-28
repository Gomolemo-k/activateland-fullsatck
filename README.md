# Activate Land Project: Starter Kit Basics

```text
Experimental project for the use of different web development technologies, such as: Astro, Deno, React...
```

## Visit our Website: [ActivateLand](http://activateland.com/)

## Server setup and deploy

```text
Follow instructions of the document:
server-setup-deploy.md
```

## Development and test setup

### Dependencies

```text
node
npm
astro
deno
```

> 🧑‍🚀 **Seasoned astronaut?** Follow this steps in your Ubuntu... Have fun!
>
### Exposed ports

```text
Astro WEB: 3000
Astro API: 3001
Deno SSR:  8080
MongoDB:   27017
```

### OS & Containers

```text
ubuntu:22.04
docker 
docker-compose
```

### Install Ubuntu dependencies

```bash
sudo apt-get update && sudo apt-get install -y curl unzip
```

### Install Docker $ Docker-Compose

```text
Chosse your favorite option and follow the official documentation:

Docker Engine (Include Docker and Docker-Compose for Terminal Commands) [https://docs.docker.com/engine/]
Docker Desktop (Include Docker Engine and more for Desktop Application) [https://docs.docker.com/desktop/]
```

### Install Node.js and NPM

```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
or
curl -k https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

```bash
sudo apt-get install -y nodejs
```

### Astro global install

```bash
npm install -g astro@2.3.3
```

### Deno global install (Best practice -> use DVM)

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
or
curl -k https://deno.land/x/install/install.sh | sh
```

### Set DENO_INSTALL and add to PATH (.bashrc)

```text
DENO_INSTALL="/root/.deno"
PATH="$DENO_INSTALL/bin:$PATH"
```

### Deno Version Manager (DVM) install

With Shell:

```bash
curl -fsSL https://dvm.deno.dev | sh
```

With Powershell:

```bash
irm https://dvm.deno.dev | iex
```

See the documentation to install, use, list or upgrade Deno versions.

```bash
dvm
```

### Check versions

```bash
docker --version
docker-compose --version #or docker compose version
node --version
npm --version
astro --version
deno --version
dvm -V
```

### Go to working directory of the project

```bash
cd ../activateland-fullstack
```

### Copy required files of the project and

```bash
cp .env.example .env
```

### Install aplication Node dependencies

```bash
npm install
```

### Install aplication Deno dependencies

```bash
rm -rf /app/node_modules/.deno/*
deno task dev:cache
```

### Start MongoDB Docker container

```bash
docker-compose up #or docker compose up
```

### Start Deno Backend && Astro Frontend

```bash
deno task dev
```

### Is working!! Open browser and navigate to the web app

```bash
http://localhost:4321
```

## 🚀 Project Structure

Inside of Activate Land project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── ...
│   ├── assets/
│   │   └── css
│   │   └── data
│   │   └── docs
│   │   └── img
│   │   └── js
│   └── contexts/
│       └── index.astro
│   └── database/
│       └── db.ts
│   └── layouts/
│       └── ...
│   └── modules/
│       └── dashboard
│              └── components
│       └── landing-page
│              └── components
│       └── location
│              └── models
│       └── workspace
│              └── components
│              └── controllers
│              └── hooks
│              └── models
│              └── routes
│       └── property
│              └── components
│              └── controllers
│              └── hooks
│              └── models
│              └── routes
│       └── property-analysis
│              └── components
│              └── controllers
│              └── hooks
│              └── models
│              └── routes
│       └── team
│              └── components
│              └── controllers
│              └── hooks
│              └── models
│              └── routes
│       └── team-member
│              └── components
│              └── controllers
│              └── hooks
│              └── models
│              └── routes
│       └── updated-file
│              └── models
│       └── user
│              └── components
│              └── controllers
│              └── hooks
│              └── models
│              └── routes
│       └── user-account
│              └── components
│              └── controllers
│              └── hooks
│              └── models
│              └── routes
│       └── user-profile
│              └── components
│              └── controllers
│              └── hooks
│              └── models
│              └── routes
│       └── user-session
│              └── models
│   └── pages/
│       └── workspaces
│       └── properties
│       └── property-analysis
│       └── team-members
│       └── teams
│       └── users
│       └── ...
│   └── stores/
│       └── ...
└── package.json
└── .env.example
└── .gitignore
└── astro.config.mjs
└── deno.json
└── deps.ts
└── docker-compose.yml
└── Dockerfile
└── README.md
└── svelte.config.js
└── tailwind.config.cjs
└── tsconfig.json
└── ...
```

## 🧞 Development Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

Custom commands (see file deno.json) are run from the root of the project, from a terminal:

| Command                       | Action                                           |
| :---------------------------- | :----------------------------------------------- |
| `deno task dev`               | Run project in development                       |
| `deno task dev:astro`         | Starts local WEB server `localhost:4321`         |
| `deno task dev:api`           | Starts local API server `localhost:3001`         |
| `deno task dev:test`          | Execute tests                                    |
| `deno task dev:cache`         | Install on Deno cache all dependencies           |

## 👀 Looking for Docker commands?

| Command                                                      | Action                                    |
| :----------------------------------------------------------- | :---------------------------------------- |
| `sudo systemctl restart docker`                              | Restart Service                           |
| `sudo apt-get update`                                        | Docker update                             |
| `sudo apt-get upgrade docker-ce`                             | Docker update                             |
| `sudo apt-get purge docker-ce docker-ce-cli containerd.io`   | Docker reinstall                          |
| `sudo rm -rf /var/lib/docker`                                | Remove cache files                        |
| :----------------------------------------------------------- | :---------------------------------------- |
| `docker ps -a -q`                                            | Docker list containers                    |
| `docker-compose up --build -d`                               | Docker build & init compose containers    |
| `docker-compose down`                                        | Docker stop compose containers            |
| `docker stop $(docker ps -a -q)`                             | Docker stop containers                    |
| `docker rm $(docker ps -a -q)`                               | Docker remove containers                  |
| `docker rmi $(docker images -q)`                             | Docker remove images                      |
| `docker volume rm $(docker volume ls -q)`                    | Docker remove volumes                     |
| `docker-compose build --no-cache`                            | Docker init compose containers            |
| `docker logs <nombre_del_contenedor>`                        | Docker container logs                     |
| `docker exec -it <container_id_or_name>`                     | Docker container terminal                 |
| `docker info`                                                | Docker Deamon Info                        |
| `dockerd`                                                    | Docker Deamon Init                        |
| :----------------------------------------------------------- | :---------------------------------------- |

### Docker restore services process (caution!!)

```bash
docker-compose down
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
docker volume rm $(docker volume ls -q)
docker-compose build --no-cache
docker-compose up
```
"# activateland-fullsatck" 
"# activateland-fullsatck" 
"# activateland-fullsatck" 
"# activateland-fullsatck" 
"# activateland-fullsatck" 
