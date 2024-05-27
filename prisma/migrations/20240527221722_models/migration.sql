-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "cpfOrCnpj" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "engine" TEXT NOT NULL,
    "kilometersDriven" INTEGER NOT NULL,
    "lastOilChange" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "serviceData" TEXT NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_licensePlate_key" ON "vehicles"("licensePlate");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
