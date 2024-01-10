/*
  Warnings:

  - The primary key for the `post_user_votes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id,post_id]` on the table `post_user_votes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "post_user_votes" DROP CONSTRAINT "post_user_votes_pkey",
ADD CONSTRAINT "post_user_votes_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "post_user_votes_user_id_post_id_key" ON "post_user_votes"("user_id", "post_id");
