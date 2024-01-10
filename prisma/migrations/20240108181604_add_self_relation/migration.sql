-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
