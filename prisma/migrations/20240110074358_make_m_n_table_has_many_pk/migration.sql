/*
  Warnings:

  - The primary key for the `post_user_votes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "post_user_votes" DROP CONSTRAINT "post_user_votes_pkey",
ADD CONSTRAINT "post_user_votes_pkey" PRIMARY KEY ("id", "user_id", "post_id");
