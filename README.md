[![Build Status](https://travis-ci.org/valiknet18/faculty-system-backend.svg?branch=master)](https://travis-ci.org/valiknet18/faculty-system-backend)

# Installing app
## 1. Configuration postgres.

### 1.1 Install docker

You can download docker from ```https://www.docker.com```

### 1.2 Build and run container
```
docker-compose up -d --build
```

## 2. Install dependencies

### 2.1 Install yarn

You can download yarn from ```https://yarnpkg.com/en/```

### 2.2 Install dependencies from package.json
```
yarn install
```

## 3. Configure .env file

### 3.1 Create .env file from base .env.dist
```
cp .env.dist .env
```

### 3.2 Set environment variables by temple from .env file

## 3. Run migrations.

```
yarn migrate up
```

## 4. Run fixtures

```
yarn fixtures
```

## 5. Run app

```
yarn start
```
