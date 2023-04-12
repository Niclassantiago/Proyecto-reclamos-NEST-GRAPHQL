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
8. Ejecutar la "Mutacion" executeSeed para llenar la base de datos con informacion.


9. Las credenciales del usuario ADMIN son:
mail: "niclas@gmail.com"
password: "123456"


Loguearse para obtener el token de acceso necesario para todas las querys, recomiendo el usuario indicado arriba, ya que es el unico usuario "Admin" con todos los permisos.

# Puntos solicitados

  ● Obtener una lista de todos los reclamos  -- Completado

  ● Obtener un reclamo por ID  -- Completado

  ● Actualizar un reclamo por ID  -- Completado

  ● Eliminar un reclamo por ID  -- Completado

  ● Busque reclamos haciendo coincidir una palabra clave en el título o problema.  -- Completado

  ● Obtenga una lista de reclamos filtradas por palabra clave.  -- Completado

  ```
  BONUS
  ```

● Implementar paginación de la lista de reclamos  -- Completado

● Implementar la autenticación y autorización para las API para que solo los
usuarios autorizados puedan agregar, actualizar y eliminar reclamos.  -- Completado

● Implementar una forma de cargar una imagen del producto y mostrarla junto
con el resto de datos (No usar base64).  -- Incompleto