### Install app
## 1. Install docker.

```
docker-compose up -d --build
```
## 2. Install dependencies

```
yarn install
```

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