<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# U2 Product API

Proyecto entregable para la materia *Arquitectura de Aplicaciones Web* (Maestría en Arquitectura de Software).

## Resumen

API REST construida con NestJS y TypeORM para gestionar productos (CRUD). Esta entrega incluye:

- Estructura de carpetas siguiendo buenas prácticas de NestJS.
- Documentación automática con Swagger disponible en `/api/docs`.
- Interceptor global que unifica las respuestas exitosas en la forma `{ message, data }`.
- Filtro global de excepciones que unifica respuestas de error en la forma `{ message, error }`.

## Estructura relevante

- `src/main.ts` — arranque de la aplicación y configuración de Swagger, pipes y providers globales.
- `src/app.module.ts` — módulo raíz (registro de providers y módulos de la app).
- `src/product/` — módulo de productos:
  - `product.controller.ts` — rutas REST con decoradores Swagger y ejemplos de respuesta.
  - `product.service.ts` — lógica de negocio (TypeORM repository).
  - `dto/` — DTOs (`CreateProductDto`, `UpdateProductDto`) con validaciones y `@ApiProperty`.
  - `entities/product.entity.ts` — entidad TypeORM `Product`.
- `src/common/interceptors/response.interceptor.ts` — estandariza respuestas exitosas.
- `src/common/filters/all-exceptions.filter.ts` — estandariza errores.

## Contrato de API (resumen)

Todas las respuestas exitosas están envueltas como:

```
{
  "message": "success",
  "data": ...
}
```

Los errores se devuelven como:

```
{
  "message": "Descripción del error",
  "error": { ... }
}
```

Endpoints principales (prefijo global `/api`):

- `POST /api/products` — crea un producto.
  - Body: `CreateProductDto`.
  - Respuesta: `{ message: 'success', data: { id, nombre, descripcion, precio } }`.
- `GET /api/products` — lista productos.
  - Respuesta: `{ message: 'success', data: [ ... ] }`.
- `GET /api/products/:id` — obtiene producto por id.
- `PUT /api/products/:id` — actualiza producto (`UpdateProductDto`).
- `DELETE /api/products/:id` — elimina producto.

Para ejemplos detallados de request/response revisa la documentación Swagger en runtime.

## Documentación Swagger

Swagger está configurado en `src/main.ts` con:

- Título, descripción, versión.
- Contacto y licencia.
- Autenticación Bearer (esquema JWT declarado en Swagger UI).
- Decoradores en DTOs y controladores para generar ejemplos de request y response.

Accede a la UI en:

```
http://localhost:3000/api/docs
```

## Requisitos y dependencias

- Node.js 18+ recomendado.
- Dependencias principales incluidas en `package.json`: `@nestjs/*`, `typeorm`, `@nestjs/swagger`, `class-validator`, `class-transformer`, drivers `mysql2`/`pg`.

## Configuración y ejecución

1. Instala dependencias:

```bash
npm install
```

2. Configura la conexión de base de datos en `src/app.module.ts` o mediante `@nestjs/config` según el entorno (production/dev). El proyecto está preparado para usar TypeORM; ajusta `type`, `host`, `port`, `username`, `password`, `database`.

3. Ejecuta en modo desarrollo:

```bash
npm run start:dev
```

4. Abre Swagger UI en `http://localhost:3000/api/docs` y prueba los endpoints.

## Validaciones y formato de respuestas

- Los DTOs usan `class-validator` y `ValidationPipe` está registrado globalmente en `main.ts` con:
  - `whitelist: true`, `transform: true`, `forbidNonWhitelisted: true`.
- El `ResponseInterceptor` transforma resultados en `{ message, data }` para consistencia.
- El `AllExceptionsFilter` captura excepciones y responde `{ message, error }`.

## Buenas prácticas y recomendaciones

- Documenta cualquier cambio en los DTOs usando `@ApiProperty` para mantener Swagger actualizado.
- Para endpoints protegidos, implementa guardas con `@UseGuards(AuthGuard)` y añade los `@ApiBearerAuth('JWT')` en controladores.
- Añade tests e2e en `test/` usando Supertest y Jest (ya hay configuración inicial).

## Comandos útiles

- `npm run start:dev` — arranque en modo desarrollo con hot-reload.
- `npm run build` — compila TypeScript.
- `npm run start` — arranca la app empaquetada.
- `npm run test` — corre pruebas unitarias.

***

Entrega: Maestría en Arquitectura de Software — Actividad Sumativa U2

***
