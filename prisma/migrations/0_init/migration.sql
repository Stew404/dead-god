-- CreateTable
CREATE TABLE "vanilla_items" (
    "unique_id" INTEGER NOT NULL,
    "id" INTEGER DEFAULT 0,
    "name" JSON,
    "ingame_description" JSON,
    "quality" INTEGER,
    "icon" VARCHAR(100),
    "description" JSON,
    "type" VARCHAR(45),
    "opening" JSON,
    "active_type" VARCHAR(45),
    "charges" JSON,
    "is_quest" INTEGER NOT NULL DEFAULT 0,
    "pools" JSON,
    "learn_more" TEXT,
    "bugs" TEXT,
    "book_of_virtues" TEXT,
    "judas_birthright" TEXT,
    "transformations" JSON,
    "tags" JSON,
    "keywords" TEXT,

    CONSTRAINT "vanilla_items_pkey" PRIMARY KEY ("unique_id")
);

