# Activate Land Project Starter Kit: Basics

```

```
### Dependencies
node
npm
astro
deno

> 🧑‍🚀 **Seasoned astronaut?** Follow this steps in your Ubuntu... Have fun!
# Exposed ports
Astro WEB: 3000
Astro API: 3001
Deno SSR:  8080
MongoDB:   27017

### Operative Sistem
S.O.: ubuntu:22.04

### Install Ubuntu dependencies
$ apt-get update && apt-get install -y curl && apt-get install -y curl unzip

### Install Node.js and NPM
$ curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
$ apt-get install -y nodejs

# Astro global install
$ npm install -g astro@2.3.3

### Deno install
$ curl -fsSL https://deno.land/x/install/install.sh | sh

### Set DENO_INSTALL and add to PATH (.bashrc)
DENO_INSTALL="/root/.deno"
PATH="$DENO_INSTALL/bin:$PATH"

### Check versions
$ node --version
$ npm --version
$ astro --version
$ deno --version

### Go to working directory of the project
$ cd ../activateland-fullstack

### Copy required files of the project and
$ cp .env.example .env

### Install aplication Node dependencies
$ npm install

### Install aplication Deno dependencies
$ rm -rf /app/node_modules/.deno/*
$ deno task dev:cache

### Start Deno Backend && Astro Frontend
$ deno task dev

### Is working!! Open browser and navigate to...
http://localhost:3000


## 🚀 Project Structure

Inside of Activate Land project, you'll see the following folders and files:

```
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
│       └── project
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
│       └── projects
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

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Development Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

Custom commands (see file deno.json) are run from the root of the project, from a terminal:

| Command                       | Action                                           |
| :---------------------------- | :----------------------------------------------- |
| `deno task dev`               | Run project in development                       |
| `deno task dev:astro`         | Starts local WEB server `localhost:3000`         |
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

docker-compose down
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
docker volume rm $(docker volume ls -q)
docker-compose build --no-cache
docker-compose up
