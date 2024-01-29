-- AlterTable
CREATE SEQUENCE categorias_id_seq;
ALTER TABLE "Categorias" ALTER COLUMN "id" SET DEFAULT nextval('categorias_id_seq');
ALTER SEQUENCE categorias_id_seq OWNED BY "Categorias"."id";
