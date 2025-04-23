/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Banner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `active` on the `Banner` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "active",
ADD COLUMN     "active" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Banner_title_key" ON "Banner"("title");
