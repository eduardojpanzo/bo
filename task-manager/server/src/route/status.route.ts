import { FastifyInstance } from "fastify";
import prisma from "../lib/prima";
import { authenticate } from "../utils/auth";
import { z } from "zod";

const bodyRequestShema = z.object({
  name: z.string(),
});

export default async function statusRoutes(app: FastifyInstance) {
  app.addHook("onRequest", authenticate);

  app.post("/status", async (req, reply) => {
    try {
      const { name } = bodyRequestShema.parse(req.body);
      const status = await prisma.taskStatus.create({ data: { name } });
      reply.send({ data: status, message: "Status criado" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });

  app.get("/status", async (_, reply) => {
    try {
      const status = await prisma.taskStatus.findMany();
      reply.send({ data: status, message: "Encontrado" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });

  app.put("/status/:id", async (req, reply) => {
    const { id } = req.params as { id: string };

    try {
      const { name } = bodyRequestShema.parse(req.body);

      const updatedStatus = await prisma.taskStatus.update({
        where: { id: parseInt(id) },
        data: { name },
      });

      reply
        .code(200)
        .send({ data: updatedStatus, message: "Atualizado com sucesso" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });

  app.delete("/status/:id", async (req, reply) => {
    try {
      const { id } = req.params as { id: string };
      await prisma.taskStatus.delete({ where: { id: parseInt(id) } });
      reply.send({ message: "Estado removido com sucesso" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });
}
