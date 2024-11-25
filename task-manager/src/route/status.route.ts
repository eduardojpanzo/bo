import { FastifyInstance } from "fastify";
import prisma from "../lib/prima";

export default async function statusRoutes(app: FastifyInstance) {
  app.post("/statuses", async (req, reply) => {
    const { name } = req.body as { name: string };
    const status = await prisma.taskStatus.create({ data: { name } });
    reply.send(status);
  });

  app.get("/statuses", async (_, reply) => {
    const statuses = await prisma.taskStatus.findMany();
    reply.send(statuses);
  });

  app.put("/statuses/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const { name } = req.body as { name: string };

    const updatedStatus = await prisma.taskStatus.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    reply.send(updatedStatus);
  });

  app.delete("/statuses/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    await prisma.taskStatus.delete({ where: { id: parseInt(id) } });
    reply.send({ message: "Status deleted" });
  });
}
