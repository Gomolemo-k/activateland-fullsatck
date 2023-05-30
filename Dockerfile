# Imatge base
FROM ubuntu:22.04

# Install Ubuntu dependencies
RUN apt-get update && apt-get install -y curl && apt-get install -y curl unzip

# Expose ports
EXPOSE 3000
EXPOSE 3001
EXPOSE 8080

# Install Node.js and NPM
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Astro global install
RUN npm install -g astro@2.3.3

# Deno install
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

# Set DENO_INSTALL and add to PATH
ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

# Check versions
RUN node --version
RUN npm --version
RUN astro --version
RUN deno --version

# Go to working directory of the Docker container
WORKDIR /app

# Copy files of the project to the container
COPY . .

# Copy files of the project to the container
COPY .env.example .env

# Install aplication Node dependencies
RUN npm install

# Install aplication Deno dependencies
RUN rm -rf /app/node_modules/.deno/*
RUN ["deno", "task", "dev:cache"]

# Start Deno Backend && Astro Frontend
CMD ["deno", "task", "dev:api", "tail", "-f"]
