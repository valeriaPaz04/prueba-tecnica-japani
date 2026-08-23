# Prueba técnica — Practicante Japani Digital 2026

## Objetivo

Construir una aplicación pequeña de productos e inventario con dos partes conectadas:

1. una API backend;
2. una interfaz frontend que consuma esa API.

Los datos son ficticios y están en `productos_japani_digital.json`.

## Tiempo y entrega

- **Fecha límite:** sábado 22 de agosto de 2026 a las 11:59 p. m. (hora de Colombia).
- **Entrega obligatoria:** enlace a un repositorio público de GitHub con todo el código y la documentación solicitada.
- El repositorio debe poder clonarse y ejecutarse siguiendo su `README.md`, sin pedir permisos adicionales.
- No se aceptan como reemplazo un ZIP, una carpeta de Drive, capturas de pantalla ni únicamente un enlace desplegado.
- Los cambios que se suban después de la fecha límite podrán considerarse fuera de la entrega.

## Orden de trabajo

### 1. Backend/API

Usa una de estas opciones:

- Python con FastAPI; o
- TypeScript con NestJS.

La API debe leer `productos_japani_digital.json` y exponer:

1. `GET /health`
2. `GET /products`
   - filtros opcionales: `search`, `category` y `status`;
   - `status` acepta únicamente `disponible`, `stock_bajo` o `sin_stock`;
   - respuesta ordenada alfabéticamente por nombre;
   - únicamente productos activos.
3. `GET /summary`
   - cantidad de productos activos;
   - productos con stock bajo;
   - productos sin stock;
   - valor total del inventario.
4. Respuestas de error claras ante parámetros no válidos.
5. Configuración de CORS suficiente para ejecutar el frontend localmente.

### Contrato mínimo de la API

- `GET /health` responde `200` e indica de forma inequívoca que el servicio está disponible.
- Cada elemento de `GET /products` incluye, como mínimo, `id`, `name`, `code`, `category`, `list_price`, `qty_available`, `status` e `inventory_value`.
- `GET /summary` incluye `active_products`, `low_stock_products`, `out_of_stock_products` e `inventory_value`.
- Los precios y valores de inventario se entregan como números, no como textos con símbolo de moneda; el frontend decide cómo mostrarlos.
- Los filtros pueden combinarse. `search` no distingue mayúsculas/minúsculas y `category` coincide con el nombre completo de la categoría sin distinguir mayúsculas/minúsculas.
- Un `status` no permitido responde con código `400` y un mensaje comprensible.
- Una búsqueda válida sin coincidencias responde `200` con una lista vacía; no es un error.
- Puedes agregar otros campos, pero no cambiar el significado de los anteriores. Documenta en tu `README.md` ejemplos reales de las tres respuestas.

### 2. Frontend

Usa React o Next.js. TypeScript es recomendado.

La interfaz debe consumir la API construida en el paso anterior; no debe leer el JSON directamente. Debe:

1. Mostrar únicamente los productos retornados por la API.
2. Permitir buscar por nombre o código.
3. Permitir filtrar por categoría y estado de inventario.
4. Mostrar el resumen de inventario entregado por `GET /summary`.
5. Tener estados comprensibles de carga, error y sin resultados.
6. Funcionar en una pantalla móvil y en escritorio.
7. Usar el logo obligatorio y seguir la guía de estilos incluida.
8. Mostrar en cada producto la imagen cuyo nombre de archivo coincide con su SKU.

La URL de la API debe poder configurarse sin modificar el código fuente. Incluye un `.env.example` sin secretos y explica el nombre de la variable en tu `README.md`.

## Reglas de negocio

- Solo se retornan productos con `active: true`.
- `qty_available <= 0`: estado `sin_stock`.
- `qty_available` entre 1 y 5: estado `stock_bajo`.
- `qty_available > 5`: estado `disponible`.
- `default_code` es el SKU oficial del producto. El campo `code` de la API y el SKU visible en el frontend deben conservar exactamente ese valor, incluidos mayúsculas, números y guiones.
- No inventes, reformatees ni reemplaces SKU. Los nombres y demás datos del producto también deben venir del mismo registro del JSON.
- La imagen de cada producto está en `assets/images/products/<default_code>.jpg`. El frontend debe conservar esta relación aunque copie los archivos a su carpeta pública o los importe durante la compilación.
- Si `categ_name` es nulo o vacío, usar `Sin categoría`.
- La búsqueda revisa `name` y `default_code`, sin distinguir mayúsculas/minúsculas.
- Los productos se ordenan alfabéticamente por `name`.
- Valor de inventario por producto: `list_price * max(qty_available, 0)`.
- Valor total de inventario: suma de los valores de los productos activos.

## Recursos visuales

- `assets/images/logos/logoJapani.png`: **obligatorio**. Debe aparecer en la interfaz; conserva sus proporciones y no lo deformes.
- `assets/images/products/`: **obligatorio** para el listado. Cada producto debe mostrar el archivo `<default_code>.jpg` correspondiente a su SKU.
- Los demás archivos de `assets/images/logos/`: opcionales.
- `assets/images/helps/`: fotos de referencia y ayuda; su uso es opcional.
- `assets/images/backgrounds/`: fondos opcionales. Puedes elegirlos, combinarlos o no utilizarlos.
- `GUIA-DE-ESTILOS.md`: colores, tipografías y pautas visuales.

Los recursos opcionales no otorgan puntos adicionales por sí solos. Preferimos una interfaz clara y funcional a una pantalla recargada.

## Pruebas

Incluye como mínimo 4 pruebas automatizadas útiles:

- al menos 3 para reglas o endpoints del backend;
- al menos 1 para un comportamiento relevante del frontend.

No cuentan como casos distintos varias pruebas que comprueben exactamente la misma regla.

## Estructura sugerida

Puedes organizar el repositorio de otra manera si lo explicas con claridad.

```text
.
├── backend/
├── frontend/
├── assets/
├── skills/
├── AI_USAGE.md
├── PRUEBA-TECNICA.md
└── README.md
```

## Entregables obligatorios

1. Código fuente del backend y frontend.
2. `README.md` con:
   - tecnologías elegidas;
   - requisitos;
   - pasos exactos para ejecutar primero el backend y después el frontend;
   - puertos y variable de URL de la API;
   - pasos para correr las pruebas;
   - decisiones principales;
   - pendientes si tuvieras más tiempo.
3. `.env.example` para cada parte que requiera variables de entorno, sin valores secretos.
4. Historial Git que permita entender el avance. No se exige una cantidad específica de commits.
5. `AI_USAGE.md`, incluso si no utilizaste IA.
6. Repositorio público de GitHub accesible antes de la fecha límite.

## Uso de IA

Puedes usar ChatGPT, Copilot, Gemini, Claude u otra herramienta. Usarla o no usarla **no suma ni resta puntos por sí mismo**.

En `AI_USAGE.md` indica:

- herramienta utilizada, o “No utilicé IA”;
- para qué la utilizaste;
- resumen de hasta 5 prompts importantes, sin copiar conversaciones completas;
- dos verificaciones que hiciste sobre sus respuestas;
- una sugerencia que corregiste o rechazaste. Si ninguna fue rechazada, explica por qué confiaste en lo utilizado.

No incluyas claves, archivos `.env`, contraseñas, tokens ni información real de personas o de Japani.

### Skills Japani Digital

Este repositorio incluye un paquete opcional de skills preparado por Japani Digital en `skills/`. Puedes:

- usar una o varias tal como están;
- adaptarlas a tu forma de trabajo; o
- crear tus propias skills en `skills/<nombre>/SKILL.md`.

Para usarlas, indica al agente que lea el `SKILL.md` elegido antes de trabajar. Consulta el catálogo y ejemplos en `skills/README.md`.

Si usas o creas una skill, inclúyela en el repositorio y regístrala en `AI_USAGE.md`, explicando brevemente para qué sirvió y qué verificaste. Las skills ayudan a organizar el trabajo, pero no reemplazan tu criterio ni las pruebas; su cantidad no suma puntos por sí sola.

## Prioridad de evaluación

Revisaremos, en este orden:

1. reglas de negocio y endpoints correctos;
2. conexión real entre frontend y backend;
3. manejo de carga, errores, filtros y ausencia de resultados;
4. pruebas automatizadas útiles y facilidad para ejecutar el proyecto;
5. claridad del código, experiencia responsive e identidad visual;
6. transparencia y criterio en el uso de IA y skills.

Una solución sencilla y completa tiene prioridad sobre funcionalidades adicionales. No hay puntos extra por autenticación, base de datos, Docker, despliegue, animaciones complejas ni por usar más herramientas de IA.

## No necesitas implementar

- autenticación;
- base de datos;
- Docker;
- despliegue;
- servicios de pago;

No recibirás puntos adicionales por agregar estas partes si el backend, la conexión con el frontend o las reglas principales quedan incompletos.

## Revisión posterior

Si continúas en el proceso tendremos una conversación de aproximadamente 20 minutos para:

- ejecutar backend y frontend;
- explicar cómo se conectan;
- realizar un cambio pequeño en vivo.

No esperamos memorización: puedes consultar tu propio código y documentación.
