
-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "banks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "age" INT,
    "job" TEXT,
    "marital" TEXT,
    "education" TEXT,
    "default" TEXT,
    "housing" TEXT,
    "loan" TEXT,
    "contact" TEXT,
    "month" TEXT,
    "day_of_week" TEXT,
    "duration" INT,
    "campaign" INT,
    "pdays" INT,
    "previous" INT,
    "poutcome" TEXT,
    "emp_var_rate" DECIMAL(8, 1),
    "cons_price_idx" DECIMAL(8, 3),
    "cons_conf_idx" DECIMAL(8, 1),
    "euribor3m" DECIMAL(8, 1),
    "nr_employed" DECIMAL(8, 1),
    "y" TEXT,
    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);


-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "banks" ADD CONSTRAINT "banks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
