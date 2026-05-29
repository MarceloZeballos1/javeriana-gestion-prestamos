# Sustentación Técnica - Pontificia Universidad Javeriana
## Arquitectura Elegida
Se implementó una Arquitectura por Capas (Rutas -> Controladores -> Servicios -> Persistencia) para garantizar la separación de responsabilidades, aislando por completo la lógica de negocio de la infraestructura de transporte HTTP (Express).
## Decisiones Técnicas
- **Node.js + TypeScript:** Entorno robusto con tipado estricto para evitar errores en tiempo de ejecución.
- **Express:** Framework minimalista e ideal para la creación ágil de APIs REST.
- **Prisma ORM + SQLite:** Elección de SQLite en formato de archivo local para garantizar portabilidad absoluta y autonomía de la solución durante la evaluación, utilizando transacciones ACID (`$transaction`) para mitigar condiciones de carrera en el stock de ejemplares.
- **Jest:** Suite de pruebas automatizadas con mocks para validar las reglas de negocio sin alterar datos reales.
## Herramientas de IA Utilizadas y Validación
Se utilizó GitHub Copilot en modo Agente para acelerar el boilerplate de rutas y modelos. Los resultados se validaron rigurosamente mediante el compilador estricto de TypeScript (`tsc --noEmit`) y la cobertura de pruebas unitarias en Jest, corrigiendo discrepancias de tipado e indexación detectadas en caliente.
## Mejoras Pendientes
Si se dispusiera de 4 horas adicionales se implementaría:
1. Autenticación y control de acceso basado en roles con JWT.
2. Middlewares de validación de esquemas de entrada en controladores (Zod).
3. Sistema de logs y auditoría centralizada (Winston/Morgan) para trazabilidad de operaciones.