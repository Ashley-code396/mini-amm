-- CreateTable
CREATE TABLE "userTransaction" (
    "id" SERIAL NOT NULL,
    "userAddress" TEXT NOT NULL,
    "poolId" TEXT,
    "type" TEXT NOT NULL,
    "token1" TEXT,
    "token2" TEXT,
    "amount1" DOUBLE PRECISION,
    "amount2" DOUBLE PRECISION,
    "txDigest" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "userTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userTransaction_txDigest_key" ON "userTransaction"("txDigest");
