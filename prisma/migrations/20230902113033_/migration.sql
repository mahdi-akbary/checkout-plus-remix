-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartItems" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "variantTitle" TEXT NOT NULL,
    "productTitle" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "priceCurrency" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),

    CONSTRAINT "CartItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftProducts" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "inventoryQuantity" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "GiftProducts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "giftDiscounts" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "discountId" TEXT NOT NULL,

    CONSTRAINT "giftDiscounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "option" INTEGER NOT NULL,
    "optionName" TEXT NOT NULL,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surveys" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "option" INTEGER NOT NULL,
    "optionName" TEXT NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);
