-- CreateTable
CREATE TABLE "menu_items" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT,
    "pageId" TEXT,
    "parentId" TEXT,
    "menuOrder" INTEGER NOT NULL DEFAULT 0,
    "target" TEXT NOT NULL DEFAULT '_self',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "menu_items_parentId_idx" ON "menu_items"("parentId");

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "menu_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
