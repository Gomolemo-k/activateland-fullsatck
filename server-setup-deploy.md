# Linux Server Setup & MERN App Deployment

## Visit our Website: [ActivateLand](http://activateland.com/)

These are the steps to setup an Ubuntu server from scratch and deploy the application with the PM2 process manager and Nginx. We are using Hetzner, but we could just as well use a different cloud provider or the own machine or VM.

Create an account at [Hetzner](https://hetzner.com)

Click on **Create Hetzner**

Choose the server options (OS, region, etc) and create it.

The server must be started before continue.

We should setup the DNS configuration (add new zone in DNS Console) and change the name servers accordingly in the domain name registry. It may take up to 48 hours until the NS-records are updated.

## SSH Keys

We will see on the setup page an area to **add an SSH key**.

There are a few ways that we can log into our server. We can use passwords, however, if we want to be more secure, I would suggest setting up SSH keys and then disabling passwords. That way we can only log in to the server from a PC that has the correct keys setup.

I am going to show how to setup authentication with SSH, but if we want to just use a password, we can skip most of this stuff.

We need to generate an SSH key on the local machine to login to the server remotely. Open the terminal and type

```bash
ssh-keygen
```

By default, it will create the public and private key files in the **.ssh** directory on the local machine and name them **id_rsa** and **id_rsa.pub**. We can change this if we want, just make sure when it asks, we put the entire path to the key as well as the filename. I am using **id_rsa_hetzner**

Once we do that, we need to copy the public key. We can use the `cat` command and then copy the key

```bash
cat ~/.ssh/id_rsa_hetzner.pub
```

Copy the key.

Now paste that into the hetzner.com textarea and name it (eg.My PC)

At some point, we will be asked to enter a root password for the server as well.

## Connecting as Root

Finish the setup and then we will be taken to the dashboard. The status will probably say **Provisioning**. Wait until it says **Running** and then open the local machine's terminal and connect as root. Of course we want to use the own server's IP address

```bash
ssh root@11.111.111.11
```

At this point, passwords are enabled, so we will be asked for the root password.

If we authenticate and login, we should see a welcome message and the prompt should now say root@localhost:~#. This is the remote server

I usually suggest updating and upgrading the packages

```bash
sudo apt update
sudo apt upgrade
```

## Create a new user

Right now we are logged in as root and it is a good idea to create a new account. Using the root account can be a security risk.

We can check the current user with the command:

```bash
whoami
```

It will say **root** right noe.

Let's add a new user. I am going to call my user **deployer**

```bash
adduser deployer
```

Just hit enter through all the questions. We will be asked for a use password as well.

We can use the following command to see the user info including the groups it belongs to

```bash
id deployer
```

Now, let's add this user to the "sudo" group, which will give them root privileges.

```bash
usermod -aG sudo deployer
```

Now if we run the following command, we should see **sudo**

```bash
id deployer
```

## Add SSH keys for new account

If we are using SSH, we will want to setup SSH keys for the new account. We do this by adding it to a file called **authorized_keys** in the users directory.

Go to the new users home directory

```bash
cd /home/deployer
```

Create a **.ssh** directory and go into it

```bash
mkdir .ssh
cd .ssh
```

Create a new file called **authorized_keys**

```bash
touch authorized_keys
```

Now we want to put the public key in that file. We can open it with a simpl text editor called **nano**

```bash
sudo nano authorized_keys
```

Now we can paste the key in here. Just repeat the step above where we ran **cat** and then the location of the public key.
**IMPORTANT**: Make sure we open a new terminal for this that is not logged into the server.

Now paste the key in the file and hi `ctrl` or `cmd+X` then hit `Y` to save and hit `enter` again

## Disabling passwords

This is an extra security step. Like I said earlier, we can disable passwords so that only the local machine with the correct SSH keys can login.

Open the following file on the server

```bash
sudo nano /etc/ssh/sshd_config
```

Look for where it says

```text
PasswordAuthentication Yes
```

Remove the # if there is one and change the Yes to No

If we want to disable root login all together we could change **permitRootLogin** to no as well. Be sure to remove the # sign becayse that comments the line out.

Save the file by exiting (ctrl+x) and hit Y to save.

Now we need to reset the sshd service

```bash
sudo systemctl restart sshd
```

Now we can logout by just typing `logout`

Try logging back in with the user (Use the username and server's IP)

```bash
ssh deployer@11.111.111.11
```

If we get a message that says "Publick key denied" or something like that, run the following commands:

```bash
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa_hetzner     # replace this with whatever we called the key file
```

try logging in again and we should see the welcome message and not have to type in any password.

### Install Ubuntu dependencies

```bash
sudo apt-get update && sudo apt-get install -y curl unzip
```

### Install Git

```bash
apt install git
```

### Install Docker $ Docker-Compose

```text
Chosse your favorite option and follow the official documentation:

Docker Engine (Include Docker and Docker-Compose for Terminal Commands) [https://docs.docker.com/engine/]
Docker Desktop (Include Docker Engine and more for Desktop Application) [https://docs.docker.com/desktop/]
```

#### Setup Docker $ Docker-Compose for Ubuntu Server 22.04

```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done

sudo apt-get update

sudo apt-get install ca-certificates curl gnupg

sudo install -m 0755 -d /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo usermod -aG docker deployer
```

### Install Node.js and NPM

```bash
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Astro global install

```bash
sudo npm install -g astro@2.3.3
```

### Deno install

```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

### Set DENO_INSTALL and add to PATH (.bashrc)

```text
DENO_INSTALL="/root/.deno"
PATH="$DENO_INSTALL/bin:$PATH"
```

### Check versions

```bash
docker --version
docker-compose --version #or: docker compose version
node --version
npm --version
astro --version
deno --version
```

## Get files on the server

We want to get our application files onto the server. We will use **Git** for this.

On SERVER, go to where we want the app to live and clone the repo of the aplication from GitHub (or where ever else)

Here is the repo I will be using:
<https://github.com/Germangalia/activateland-fullstack>

```bash
mkdir sites
cd sites
git clone https://github.com/Germangalia/activateland-fullstack.git
```

Now I should have a folder called **.../sites/activateland-fullstack** with all of my files and folders.

### Go to working directory of the project

```bash
cd ../sites/activateland-fullstack
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
sudo docker compose up -d
```

### Start Deno Backend && Astro Frontend

```bash
deno task dev
```

### Is working!! Open browser and navigate to the web app

```bash
http://localhost:3000
```

## Get files on the server

We want to get our application files onto the server. We will use **Git** for this.

On SERVER, go to where we want the app to live and clone the repo of the aplication from GitHub (or where ever else)

Here is the repo I will be using:
<https://github.com/Germangalia/activateland-fullstack>

```bash
mkdir sites
cd sites
git clone https://github.com/Germangalia/activateland-fullstack.git
```

Now I should have a folder called **.../sites/activateland-fullstack** with all of my files and folders.

## App setup

There are a few things that we need to do including setting up the .ENV file, installing dependencies and building our static assets for React ans Deno.

### .env file

With this particular application, I create a .envexample file because I did not want to push the actual .env file to GitHub. So we need to first rename that .envexample:

```bash
mv .envexample .env

# To check
ls -a
```

Now we need to edit that file

```bash
sudo nano .env
```

Change the NODE_ENV to "production" and change the MONGO_URI to the own. we can create a mongodb Atlas database [here](https://mongodb.com)

Exit with saving.

### Dependencies & Build

We need to install the server dependencies. This should be run from the root of the mern-tutorial folder. NOT the backend folder.

```bash
npm install
```

Install frontend deps:

```
cd frontend
npm install
```

We need to build our static assets as well. Do this from the `frontend` folder

```bash
npm run build
```

## Run the app

Now we should be able to run the app like we do on our local machine. Go into the root and run

```bash
npm start
```

If we go to the ip and port 3000, we should see the app. In my case, I would go to

```text
http://11.111.111.11:3000
```

Even though we see our app running, we are not done. We don't want to leave a terminal open with npm start. We also don't want to have to go to port 3000. So let's fix that.

Stop the app from running with `ctrl+C`

## PM2 Setup

PM2 is a production process manager fro Node.js. It allows us to keep Node apps running without having to have terminal open with npm start, etc like we do for development.

Let's first install PM2 globally with NPM

```bash
sudo npm install -g pm2
```

Run with PM2

```bash
pm2 start backend/server.js   # or whatever the entry file is
```

Now if we go back to the server IP and port 3000, we will see it running. We could even close the terminal and it will still be running

There are other pm2 commands for various tasks as well that are pretty self explanatory:

- pm2 show app
- pm2 status
- pm2 restart app
- pm2 stop app
- pm2 logs (Show log stream)
- pm2 flush (Clear logs)

## Firewall Setup

Obviously we don't want users to have to enter a port of 3000 or anything else. We are going to solve that by using a server called NGINX. Before we set that up, lets setup a firewall so that people can not directly access any port except ports for ssh, http and https

The firewall we are using is called UFW. Let's enable it.

```bash
sudo ufw enable
```

We will notice now if go to the site using :3000, it will not work. That is because we setup a firewall to block all ports.

We can check the status of the firewall with

```bash
sudo ufw status
```

Now let's open the ports that we need which are 22, 80 and 443

```bash
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

## Setup NGINX

Now we need to install NGINX to serve our app on port 80, which is the http port

```bash
sudo apt install nginx
```

If we visit the IP address with no port number, will see a **Welcome to nginx!** page.

Now we need to configure a proxy for our MERN app.

Open the following config file

```bash
sudo nano /etc/nginx/sites-available/default
```

Find the **location /** area and replace with this

```text
location / {
    proxy_pass http://localhost:3000;    # or which other port the app runs on
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

Above that, we can also put the domain that plan on using:

```text
server_name thedomain.com www.thedomain.com;
```

Save and close the file

We can check the nginx configuration with the following command

```bash
sudo nginx -t
```

Now restart the NGINX service:

```bash
sudo service nginx restart
```

Now we should see the app when we go to the IP address in the browser.

## Domain Name

We probably don't want to use the IP address to access the app in the browser. So let's go over setting the domain with a Hetzner.

We need to register the domain. It doesn't matter who use for a registrar. I use **Namecheap**, but we could use Godaddy, Google Domains or anyone else.

We need to change the nameservers with the Domain registrar. The process can vary depending on who we use. With Namecheap, the option is right on the details page.

We want to add the nameservers like:

- ns1.hetzner.com
- ns2.hetzner.com
- ns3.hetzner.com
- ns4.hetzner.com
- ns5.hetzner.com

Technically this could take up to 48 hours, but it almost never takes that long. In my own experience, it is usually 30 - 90 minutes.

### Set the domain in Hetzner

Go to the dashboard and select **Domains** and then **Create Domain**

Add in the domain name and link to the Hetzner with the app, then submit the form.

Now we will see some info like **SOA Record**, **NS Record**, **MX Record**, etc. There are A records already added that link to the IP address, so we don't have to worry about that. If we wanted to add a subdomain, we could create an A record here for that.

Like I said, it may take a few hours, but we should be all set. we have now deployed the application.

if we want to make changes to the app, just push to github and run a **git pull** on the server. There are other tools to help automate the deployments, but I will go over that another time.

## Set Up SSL (Not used yet!)

We can purchase an SSL and set it with the domain registrar or we can use Let's Encrypt and set one up for free using the following commands:

```bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --nginx -d thedomain.com -d www.thedomain.com

# Only valid for 90 days, test the renewal process with
certbot renew --dry-run
```

## Restart service in Ubuntu Server

### Enable use commands without password for scripts

If you want to run a specific command with sudo without entering a password, you can configure sudoers file to allow the command to be executed without requiring a password. Here's how you can do it:

Open a terminal on your Ubuntu server.

Run the command sudo visudo to open the sudoers file in the default text editor.

Scroll down to the section that contains the user privileges specification.

Add the following line to allow the deployer user to run the specific command without a password prompt:

```bash
deployer ALL=(ALL) NOPASSWD: /usr/bin/docker compose up -d
```

Replace /usr/bin/docker compose up -d with the actual path to the docker compose command if it's located in a different location.

Save the file and exit the text editor.

After making this change, the deployer user will be able to execute the docker compose up -d command with sudo without being prompted for a password.

Please note that modifying the sudoers file requires administrative privileges, and it's important to be cautious when editing this file. Make sure to double-check the changes and ensure they are correct to avoid any security risks.

### Setup systemd

Setup a systemd configuration in Ubuntu Server to manage the web service. If the service stops for any reason, systemd will automatically restart it and execute the command in the correct directory.With this configuration, the command will be executed from the specified directory every time the service starts.

Open the service unit file:
```bash
sudo nano /etc/systemd/system/activateland.service
```

Write this in the file:

```bash
[Unit]
Description=activateland
After=network.target

[Service]
ExecStart=/bin/bash -c "cd /home/deployer/sites/activateland-fullstack && /usr/bin/docker compose up -d && /home/deployer/.deno/bin/deno task dev"
Restart=always
User=deployer
Group=sudo

[Install]
WantedBy=multi-user.target

```

Save the service unit file and close the editor.

Reload the systemd configuration:

```bash
sudo systemctl daemon-reload
```

Start the service:

```bash
sudo systemctl start mi-servicio
```

Check the service status:

```bash
sudo systemctl status mi-servicio
```

If it is required, stop the servide, restart it or check the logs:

```bash
sudo systemctl stop mi-servicio
sudo systemctl restart mi-servicio
sudo journalctl -u activateland.service
```
