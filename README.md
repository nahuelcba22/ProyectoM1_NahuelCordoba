# Colorfly Generator

Aplicación web interactiva que permite generar paletas de colores aleatorias, con control de cantidad, bloqueo de colores y visualización en formato HEX.

# Funcionalidades
Generación de paletas de colores aleatorios

Selección de cantidad de colores (6, 8 o 9)

Bloqueo de colores para mantenerlos entre generaciones

Copia de color al hacer click

Conversión automática a formato HEX para visualización

Selección de formato de generación (HEX / HSL)

Feedback visual mediante tooltip y notificación (toast)

Interfaz simple e interactiva
# Decisiones técnicas
Uso de HTML semántico

Estilos con CSS

JavaScript
Manejo del estado mediante un array de objetos:
{ color, locked }
# Separación de responsabilidades:
Generación de datos

Renderizado en DOM

Conversión de HSL a HEX

Uso de eventos para interacción del usuario
# Estructura del proyecto
/index.html → estructura de la aplicación

/css/styles.css → estilos visuales

/js/script.js → lógica y comportamiento
# Uso
Seleccionar la cantidad de colores

Hacer click en "Generar paleta"

Bloquear colores si se desea mantenerlos

Hacer click sobre un color para copiarlo

Cambiar el formato de generación si se desea

Ejecución local

# Despliegue en GitHub Pages
Subir el repositorio a GitHub
Ir a Settings del repositorio
Entrar en la sección "Pages"
Seleccionar la rama main
Guardar cambios

Luego de unos segundos, la aplicación estará disponible en:

https://nahuelcba22.github.io/ProyectoM1_NahuelCordoba/
# Demo

https://nahuelcba22.github.io/ProyectoM1_NahuelCordoba/

# Posibles mejoras
Conversión en tiempo real entre formatos (sin regenerar colores)

Guardado de paletas (localStorage)

Exportación de paletas (imagen o archivo)

Historial de colores generados

Mejora de accesibilidad

Optimización para dispositivos móviles

Animaciones más avanzadas