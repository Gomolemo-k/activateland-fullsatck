/*
  Warnings:

  - You are about to drop the column `propertyAnalysis` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `TeamMember` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TeamMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userProfileId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userPhotoId]` on the table `UploadedFile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siainImageId]` on the table `UploadedFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userProfileId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `workspaceId` on the `Property` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `siainImageId` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `locationId` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `propertyId` to the `PropertyAnalysis` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `workspaceId` on the `Team` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `Id` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `TeamMember` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `UploadedFile` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `userId` on the `UserAccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `UserProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userLocationId` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `UserSession` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Workspace` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `name` on table `Workspace` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "userProfileId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "propertyAnalysis",
DROP COLUMN "workspaceId",
ADD COLUMN     "workspaceId" UUID NOT NULL,
ALTER COLUMN "siainImageId" SET NOT NULL,
DROP COLUMN "locationId",
ADD COLUMN     "locationId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "PropertyAnalysis" DROP COLUMN "propertyId",
ADD COLUMN     "propertyId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "workspaceId",
ADD COLUMN     "workspaceId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "role",
DROP COLUMN "userId",
ADD COLUMN     "Id" TEXT NOT NULL,
ADD COLUMN     "teamId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "UploadedFile" ADD COLUMN     "siainImageId" UUID,
ADD COLUMN     "userPhotoId" UUID,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
DROP COLUMN "userLocationId",
ADD COLUMN     "userLocationId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "UserSession" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "userId",
ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_PropertyToUploadedFile" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_UploadedFileToUserProfile" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyToUploadedFile_AB_unique" ON "_PropertyToUploadedFile"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyToUploadedFile_B_index" ON "_PropertyToUploadedFile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UploadedFileToUserProfile_AB_unique" ON "_UploadedFileToUserProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_UploadedFileToUserProfile_B_index" ON "_UploadedFileToUserProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Location_userProfileId_key" ON "Location"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_locationId_key" ON "Property"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyAnalysis_propertyId_key" ON "PropertyAnalysis"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedFile_userPhotoId_key" ON "UploadedFile"("userPhotoId");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedFile_siainImageId_key" ON "UploadedFile"("siainImageId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccount_userId_key" ON "UserAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSession_userId_key" ON "UserSession"("userId");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccount" ADD CONSTRAINT "UserAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyAnalysis" ADD CONSTRAINT "PropertyAnalysis_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToUploadedFile" ADD CONSTRAINT "_PropertyToUploadedFile_A_fkey" FOREIGN KEY ("A") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PropertyToUploadedFile" ADD CONSTRAINT "_PropertyToUploadedFile_B_fkey" FOREIGN KEY ("B") REFERENCES "UploadedFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UploadedFileToUserProfile" ADD CONSTRAINT "_UploadedFileToUserProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "UploadedFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UploadedFileToUserProfile" ADD CONSTRAINT "_UploadedFileToUserProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
