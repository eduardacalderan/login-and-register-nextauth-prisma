/*
  Warnings:

  - Added the required column `emailToken` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "emailToken" TEXT NOT NULL,
ADD COLUMN     "update" TEXT;
