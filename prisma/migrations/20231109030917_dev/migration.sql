/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Session_value_key` ON `Session`(`value`);
