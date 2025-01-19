# WSD Task

This repository contains the **WSD Task** project. Follow the steps below to clone, build, and run the application.

## Prerequisites

- [Git](https://git-scm.com/) installed
- [Docker](https://www.docker.com/) installed

## Getting Started

### Clone the Repository

Use the following command to clone the repository:

```bash
git clone git@github.com:Yeasir-Hossain/WSD-task.git
```

Navigate to the project directory:

```bash
cd WSD-task
```

### Build and Run with Docker

Use Docker Compose to build and run the project:

```bash
docker compose up --build
```

This will set up both the frontend and server.

### Application Ports

- **Frontend**: Available locally at [http://localhost:4173](http://localhost:4173)
- **Backend**: Available locally at [http://localhost:5000](http://localhost:5000)

## Project Structure

The repository is structured as follows:

- `client/`: Contains the code for the frontend application.
- `server/`: Contains the backend server code.
- `docker-compose.yml`: Configuration for setting up Docker containers.

### N.B: If Keycloak does not connect and always restarting
```bash
chmod -R 777 ./keycloak_data
```