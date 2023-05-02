# Imatge base
FROM node:14

# Instal·la Astro
RUN npm install -g astro@0.21.4

# Estableix el directori de treball
WORKDIR /app

# Copia el fitxer package.json i package-lock.json al contenidor
COPY package*.json ./

# Instal·la les dependències del projecte
RUN npm install

# Copia els fitxers del projecte al contenidor
COPY . .

# Inicia Astro
CMD ["astro", "dev"]
