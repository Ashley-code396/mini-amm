-- AlterTable
ALTER TABLE "userTransaction" ADD COLUMN     "lpAmount" TEXT,
ALTER COLUMN "amount1" SET DATA TYPE TEXT,
ALTER COLUMN "amount2" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "userTransaction_userAddress_idx" ON "userTransaction"("userAddress");

-- CreateIndex
CREATE INDEX "userTransaction_poolId_idx" ON "userTransaction"("poolId");

-- CreateIndex
CREATE INDEX "userTransaction_timestamp_idx" ON "userTransaction"("timestamp");
