-- CreateTable
CREATE TABLE "poolEvent" (
    "id" SERIAL NOT NULL,
    "digest" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sender" TEXT,
    "payload" JSONB NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "poolEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pool" (
    "id" SERIAL NOT NULL,
    "poolId" TEXT NOT NULL,
    "reserveA" BIGINT NOT NULL,
    "reserveB" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventCursor" (
    "id" TEXT NOT NULL,
    "txDigest" TEXT,
    "eventSeq" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eventCursor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "poolEvent_digest_key" ON "poolEvent"("digest");

-- CreateIndex
CREATE UNIQUE INDEX "pool_poolId_key" ON "pool"("poolId");
