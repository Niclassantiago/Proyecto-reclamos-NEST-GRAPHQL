<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Copiar el ```env.template``` y renombrar a ```.env```
3. Ejecutar
```
yarn install
```
4. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
5. Levantar la base de datos
```
docker-compose up -d
```
6. Levantar el backend de Nest
```
yarn start:dev
```
7. Visitar el sitio
```
localhost:3000/graphql
```

## Stack usado
* MongoDB
* Nest