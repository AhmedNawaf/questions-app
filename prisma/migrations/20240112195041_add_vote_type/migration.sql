/*
  Warnings:

  - Added the required column `type` to the `post_user_votes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VOTE_TYPE" AS ENUM ('up_vote', 'down_vote');

-- AlterTable
ALTER TABLE "post_user_votes" ADD COLUMN     "type" "VOTE_TYPE" NOT NULL;
