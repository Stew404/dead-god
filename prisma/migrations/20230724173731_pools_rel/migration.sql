/*
  Warnings:

  - You are about to drop the column `pools` on the `vanilla_items` table. All the data in the column will be lost.
  - You are about to drop the column `transformations` on the `vanilla_items` table. All the data in the column will be lost.
  - The `icon` column on the `vanilla_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "vanilla_items" DROP COLUMN "pools",
DROP COLUMN "transformations",
ADD COLUMN     "pools_copy" JSON,
ADD COLUMN     "transformations_old" JSON,
DROP COLUMN "icon",
ADD COLUMN     "icon" JSON,
ALTER COLUMN "description" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "transformations" (
    "id" SERIAL NOT NULL,
    "transformation_id" VARCHAR(40),
    "name" JSON,

    CONSTRAINT "transformations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pools" (
    "id" SERIAL NOT NULL,
    "pool_id" VARCHAR(40),
    "name" JSON,

    CONSTRAINT "pools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TransformationToVanillaItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PoolToVanillaItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "transformations_transformation_id_key" ON "transformations"("transformation_id");

-- CreateIndex
CREATE UNIQUE INDEX "pools_pool_id_key" ON "pools"("pool_id");

-- CreateIndex
CREATE UNIQUE INDEX "_TransformationToVanillaItem_AB_unique" ON "_TransformationToVanillaItem"("A", "B");

-- CreateIndex
CREATE INDEX "_TransformationToVanillaItem_B_index" ON "_TransformationToVanillaItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PoolToVanillaItem_AB_unique" ON "_PoolToVanillaItem"("A", "B");

-- CreateIndex
CREATE INDEX "_PoolToVanillaItem_B_index" ON "_PoolToVanillaItem"("B");

-- AddForeignKey
ALTER TABLE "_TransformationToVanillaItem" ADD CONSTRAINT "_TransformationToVanillaItem_A_fkey" FOREIGN KEY ("A") REFERENCES "transformations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransformationToVanillaItem" ADD CONSTRAINT "_TransformationToVanillaItem_B_fkey" FOREIGN KEY ("B") REFERENCES "vanilla_items"("unique_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoolToVanillaItem" ADD CONSTRAINT "_PoolToVanillaItem_A_fkey" FOREIGN KEY ("A") REFERENCES "pools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoolToVanillaItem" ADD CONSTRAINT "_PoolToVanillaItem_B_fkey" FOREIGN KEY ("B") REFERENCES "vanilla_items"("unique_id") ON DELETE CASCADE ON UPDATE CASCADE;
