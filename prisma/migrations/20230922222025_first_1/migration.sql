/*
  Warnings:

  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL NOT NULL,
    "products" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "intent_id" TEXT,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_Order" ("createdAt", "id", "intent_id", "price", "products", "status") SELECT "createdAt", "id", "intent_id", "price", "products", "status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_intent_id_key" ON "Order"("intent_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
