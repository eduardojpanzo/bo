import { FastifyInstance } from "fastify";
import prisma from "../lib/prima";
import { z } from "zod";
import { authenticate } from "../utils/auth";

const bodyRequestShema = z.object({
  name: z.string(),
});

const userCredentials = z.object({
  user: z.object({
    id: z.number(),
    email: z.string(),
  }),
});

export default async function categoryRoutes(app: FastifyInstance) {
  app.addHook("onRequest", authenticate);

  app.post("/categories", async (req, reply) => {
    try {
      const { name } = bodyRequestShema.parse(req.body);
      const {
        user: { id },
      } = userCredentials.parse(req.query);

      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          email: true,
          id: true,
        },
      });

      if (!user) {
        reply.code(404).send({ message: "Usúario não existente" });
        return;
      }

      const category = await prisma.category.create({
        data: { name, userId: user.id },
      });
      reply.code(201).send({ data: category, message: "Criado com sucesso" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });

  app.get("/categories", async (req, reply) => {
    try {
      const {
        user: { id },
      } = userCredentials.parse(req.query);

      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          email: true,
          id: true,
        },
      });

      if (!user) {
        reply.code(404).send({ message: "Usúario não existente" });
        return;
      }

      const categories = await prisma.category.findMany({
        where: { NOT: { name: `${user.email}-all` }, userId: user.id },
      });
      reply.send({ data: categories, message: "econtrado" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });

  app.put("/categories/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    try {
      const { name } = bodyRequestShema.parse(req.body);

      const updatedCategory = await prisma.category.update({
        where: { id: parseInt(id) },
        data: { name },
      });

      reply
        .code(201)
        .send({ data: updatedCategory, message: "Atualizado com sucesso" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });

  app.delete("/categories/:id", async (req, reply) => {
    try {
      const { id } = req.params as { id: string };
      await prisma.category.delete({ where: { id: parseInt(id) } });
      reply.code(200).send({ message: "categoria removida com sucesso" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });
}
