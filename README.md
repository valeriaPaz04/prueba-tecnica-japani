# Prueba técnica – Japani Digital

Aplicación de inventario con backend en NestJS (TypeScript) y frontend en React + Vite (TypeScript).

## Tecnologías elegidas

- **Backend:** NestJS con TypeScript. Se eligió porque impone una estructura de archivos predefinida (controllers, services, modules), a diferencia de FastAPI, donde la organización queda a criterio propio.
- **Frontend:** React + Vite con TypeScript, siguiendo el mismo stack ya usado en proyectos anteriores.
- **Pruebas:** Jest (unitarias y e2e) en el backend; Vitest + Testing Library en el frontend.

## Requisitos

- Node.js 18 o superior
- npm

## Cómo ejecutar el proyecto

### 1. Backend

```bash
cd backend
npm install
npm run start:dev
```

El backend queda escuchando en **http://localhost:3000**.

### 2. Frontend

En una segunda terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en **http://localhost:5173**.

> El backend debe estar corriendo antes de abrir el frontend, ya que este consume la API en tiempo real.

## Variables de entorno

### Backend (`backend/.env.example`)

```
PORT=3000
FRONTEND_URL=http://localhost:5173
```

El backend no carga estos valores automáticamente desde un archivo `.env` real (no se instaló ninguna librería como `dotenv` o `@nestjs/config` para esto), ya que `main.ts` usa valores por defecto suficientes para correr el proyecto localmente (`process.env.PORT ?? 3000`). El archivo documenta las variables que existirían si se quisiera sobreescribirlas manualmente en el entorno.

### Frontend (`frontend/.env.example`)

```
VITE_API_URL=http://localhost:3000
```

Esta sí es leída automáticamente por Vite. Define la URL base que el frontend usa para todas sus peticiones a la API.

## Cómo correr las pruebas

### Backend

```bash
cd backend
npm run test       # pruebas unitarias (ProductsService)
npm run test:e2e   # pruebas end-to-end (endpoints reales por HTTP)
```

### Frontend

```bash
cd frontend
npm run test        # pruebas de componentes (Summary)
```

## Ejemplos reales de respuesta

**GET /health**
```json
{ "status": "ok" }
```

**GET /products?category=lubricantes** (filtro sin distinguir mayúsculas)
```json
[
  {
    "id": 101,
    "name": "Aceite Racer Max 4T 10W-40",
    "code": "2152",
    "category": "Lubricantes",
    "list_price": 24500,
    "qty_available": 12,
    "status": "disponible",
    "inventory_value": 294000
  }
]
```

**GET /products?status=comprado** (valor no permitido)
```json
{
  "message": ["status debe ser uno de: disponible, stock_bajo, sin_stock"],
  "error": "Bad Request",
  "statusCode": 400
}
```

**GET /summary**
```json
{
  "active_products": 11,
  "low_stock_products": 4,
  "out_of_stock_products": 3,
  "inventory_value": 1980000
}
```

## Decisiones principales

- **Separación DTO / Service / Controller:** las reglas de validación de entrada (`QueryProductsDto`) están separadas de las reglas de negocio (cálculo de `status` e `inventory_value` en `ProductsService`). El controller queda delgado, solo delega al service.
- **Imágenes y assets en `frontend/public/`:** tanto el logo como las fotos de producto se sirven desde `public/` (no como imports de `src/assets/`), porque la ruta de cada foto de producto se construye dinámicamente a partir del `code` que entrega la API en tiempo real, y `public/` permite rutas predecibles sin necesidad de un `import` fijo por archivo.
- **Nombre original del archivo de datos:** se mantuvo `productos_japani_digital.json` sin renombrar, ya que la prueba técnica no exige ningún nombre específico y no había razón funcional para cambiarlo.

## Pendientes si tuviera más tiempo

- Agregar pruebas de componente para `Filters` y `ProductList`, además de la ya incluida para `Summary`.
- Agregar un pequeño retraso (debounce) al buscador: actualmente cada tecla presionada dispara una petición nueva de inmediato, sin esperar a que el usuario termine de escribir.
- Agregar paginación en `GET /products`: ahora mismo la API siempre devuelve la lista completa de una vez, lo cual no escala bien si el inventario crece a cientos o miles de productos.
- Seguir puliendo el diseño visual con más detalle, siguiendo más de cerca `GUIA-DE-ESTILOS.md`.

## Uso de IA

Ver `AI_USAGE.md`.