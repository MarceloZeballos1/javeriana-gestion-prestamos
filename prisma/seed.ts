import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.libro.upsert({ where: { isbn: '978-1' }, update: {}, create: { isbn: '978-1', titulo: 'Ingeniería de Software', areaConocimiento: 'Sistemas', ejemplaresDisponibles: 2 } });
  await prisma.libro.upsert({ where: { isbn: '978-2' }, update: {}, create: { isbn: '978-2', titulo: 'Cálculo Multivariable', areaConocimiento: 'Matemáticas', ejemplaresDisponibles: 1 } });
  console.log('Seed completado');
}
main().catch(console.error).finally(() => prisma.$disconnect());
