import { FastifyInstance } from "fastify";
import prisma from "../lib/prima";

export default async function categoryRoutes(app: FastifyInstance) {
  app.post("/categories", async (req, reply) => {
    const { name } = req.body as { name: string };
    const category = await prisma.category.create({ data: { name } });
    reply.send(category);
  });

  app.get("/categories", async (_, reply) => {
    const categories = await prisma.category.findMany();
    reply.send(categories);
  });

  app.put("/categories/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const { name } = req.body as { name: string };

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    reply.send(updatedCategory);
  });

  app.delete("/categories/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    await prisma.category.delete({ where: { id: parseInt(id) } });
    reply.send({ message: "Category deleted" });
  });
}
