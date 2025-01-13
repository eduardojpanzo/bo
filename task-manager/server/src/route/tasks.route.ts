import { FastifyInstance } from "fastify";
import prisma from "../lib/prima";
import { z } from "zod";
import { authenticate } from "../utils/auth";

const userCredentials = z.object({
  user: z.object({
    id: z.number(),
    email: z.string(),
  }),
});

const bodyRequestShema = z.object({
  title: z.string(),
  description: z.string(),
  dueDate: z.string(),
  statusId: z.number(),
  categoryId: z.number(),
});

export default async function taskRoutes(app: FastifyInstance) {
  // Middleware para verificar autenticação
  app.addHook("onRequest", authenticate);

  app.post("/tasks", async (req, reply) => {
    const {
      user: { id },
    } = userCredentials.parse(req.query);

    const { title, description, dueDate, statusId, categoryId } =
      bodyRequestShema.parse(req.body);

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

    try {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          dueDate: new Date(dueDate),
          statusId,
          categoryId,
          userId: Number(id),
        },
      });
      reply.code(201).send({ data: task, message: "Tarefa criado" });
    } catch (err) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });

  app.get("/tasks", async (req, reply) => {
    try {
      const {
        user: { id },
      } = userCredentials.parse(req.query);
      console.log(id);

      const tasks = await prisma.task.findMany({
        where: { userId: Number(id) },
      });
      reply.send({ data: tasks, message: "Encotrado!" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });

  app.put("/tasks/:id", async (req, reply) => {
    const { id } = req.params as { id: string };

    try {
      const { title, description, dueDate, statusId, categoryId } =
        bodyRequestShema.parse(req.body);

      const updatedTask = await prisma.task.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          dueDate: dueDate ? new Date(dueDate) : undefined,
          statusId,
          categoryId,
        },
      });

      reply
        .code(201)
        .send({ data: updatedTask, message: "Tarefa atualizado com sucesso" });
    } catch (error) {
      reply.code(400).send({ message: "alguma coisa deu errado" });
    }
  });

  app.delete("/tasks/:id", async (req, reply) => {
    const { id } = req.params as { id: string };

    try {
      await prisma.task.delete({ where: { id: Number(id) } });
      reply.send({ message: "Tarefa removido" });
    } catch (error) {
      reply.code(400).send({ message: "algum erro desconhecido" });
    }
  });
}
