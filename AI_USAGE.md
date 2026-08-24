# Uso de inteligencia artificial

## Herramienta

Claude de Anthropic.

## Para qué la utilicé

Para aprender a construir el backend en NestJS, framework que nunca había usado antes, y para conectar el frontend en React + Vite a esa API. Usé la IA como tutor: pedí que cada concepto nuevo (DTOs, ValidationPipe, etc) viniera acompañado de una explicación clara antes de avanzar al siguiente paso. Hice preguntas de seguimiento repetidas veces cuando algo no me quedaba claro. También la usé para depurar errores durante el desarrollo y para ajustar el diseño visual siguiendo la guía de estilos entregada.

## Skills utilizadas o creadas

No utilicé skills.


## Prompts importantes

1. "Explícame los pros y contras de FastAPI vs. NestJS, sin recomendarme cuál usar, quiero elegir yo misma."
2. "Explícame paso a paso por qué el ValidationPipe con un DTO rechaza un status inválido."
3. "Explícame cómo se conecta realmente un frontend corriendo en el puerto 5173 con un backend en el puerto 3000."
4. "Tengo estos errores de TypeScript en mis archivos de pruebas, diagnostica la causa real antes de darme una solución."
5. "Ayúdame a reorganizar la información de las tarjetas de producto y a mejorar el estado de foco y el layout responsive, siguiendo la guía de estilos."

## Verificaciones realizadas

1. Cuando la IA me indicó que el error de `import * as request from 'supertest'` era real (no un capricho de configuración), lo confirmé corriendo `npx tsc --noEmit` antes y después de aplicar la corrección sugerida, viendo con mis propios ojos que el error desaparecía.
2. Cuando la IA me dijo que los errores de `describe`/`it`/`expect` en el editor eran un falso positivo del servidor de TypeScript y no un problema real de mi código, lo verifiqué de forma independiente (con `npx tsc --noEmit` y contrastando con otra fuente) antes de aceptar esa explicación.

## Sugerencia corregida o rechazada

Al construir el backend, la IA sugirió renombrar el archivo de datos de `productos_japani_digital.json` a `products.json`, por brevedad. Rechacé esa sugerencia y mantuve el nombre original, ya que la prueba técnica no exige ningún nombre específico para el archivo — hacerlo solo habría sido un cambio cosmético.
