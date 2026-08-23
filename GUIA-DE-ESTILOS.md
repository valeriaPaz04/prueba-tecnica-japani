# Guía de estilos - Japani Digital

Esta guía orienta la apariencia del frontend: queremos una solución clara que conserve la identidad Japani y permita que tomes decisiones propias.

## Logo

- El archivo `assets/images/logos/logoJapani.png` es obligatorio y debe estar visible en la interfaz.
- Conserva la relación de aspecto; no lo estires, recortes ni gires.
- Procura que tenga buen contraste y un espacio libre alrededor.
- Los demás logos incluidos son opcionales.

## Tipografías

- Títulos y cifras destacadas: **Suprapower SE**.
- Texto secundario, controles y cuerpo: **Eurostile**.
- Los archivos originales están en `assets/fonts/`. El siguiente ejemplo supone que copiaste ambos archivos a `frontend/public/fonts/`; si decides importarlos desde otra ubicación, ajusta las rutas de `url(...)`.

Ejemplo CSS:

```css
@font-face {
  font-family: "Suprapower SE";
  src: url("/fonts/suprapower-se-heavy.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: "Eurostile";
  src: url("/fonts/eurostile.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}

:root {
  --font-display: "Suprapower SE", "Arial Black", sans-serif;
  --font-body: "Eurostile", "Trebuchet MS", sans-serif;
}

h1, h2, h3, .metric {
  font-family: var(--font-display);
}

body, button, input, select {
  font-family: var(--font-body);
}
```

## Colores

| Uso | Color |
| --- | --- |
| Rojo principal | `#DE0C1A` |
| Negro | `#000000` |
| Blanco | `#FFFFFF` |

El rojo debe destacar acciones y elementos importantes, no cubrir toda la pantalla. Mantén contraste suficiente entre texto y fondo.

## Interfaz

- Da prioridad a búsqueda, filtros, resumen y listado de productos.
- Muestra la imagen asociada a cada SKU dentro de su tarjeta o fila. Usa `object-fit: contain` para no recortar el producto ni deformar la fotografía.
- Haz visibles los estados `disponible`, `stock_bajo` y `sin_stock` sin depender únicamente del color.
- Incluye etiquetas para los campos de formulario y estados de foco visibles.
- La pantalla debe adaptarse a móvil y escritorio.
- Evita animaciones o decoraciones que dificulten consultar la información.

## Recursos opcionales

- `assets/images/helps/` contiene fotos de referencia; puedes usar una, varias o ninguna.
- `assets/images/backgrounds/` contiene fondos para experimentar; su uso no es obligatorio.
- Los logos distintos de `assets/images/logos/logoJapani.png` también son opcionales.

La evaluación se concentra en claridad, funcionamiento e integración con la API. El uso de más imágenes no aumenta la calificación por sí solo.
