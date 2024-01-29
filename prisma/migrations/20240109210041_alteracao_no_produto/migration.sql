/*
  Warnings:

  - You are about to drop the column `categoriasId` on the `Produtos` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `Produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Produtos" DROP CONSTRAINT "Produtos_categoriasId_fkey";

-- AlterTable
ALTER TABLE "Produtos" DROP COLUMN "categoriasId",
ADD COLUMN     "categoriaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
