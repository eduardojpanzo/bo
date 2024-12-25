import { FastifyInstance } from "fastify";
import prisma from "../lib/prima";
import { z } from "zod";

export default async function taskRoutes(app: FastifyInstance) {
  // Middleware para verificar autenticação
  app.addHook("onRequest", async (req, reply) => {
    try {
      //await req.jwtVerify();
      console.log("check the auth");
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });

  app.post("/tasks", async (req, reply) => {
    const userCredentials = z.object({
      userId: z.number(),
    });

    const { userId } = userCredentials.parse(req.query);

    const bodyRequestShema = z.object({
      title: z.string(),
      description: z.string(),
      dueDate: z.string(),
      statusId: z.number(),
      categoryId: z.number(),
    });

    const { title, description, dueDate, statusId, categoryId } =
      bodyRequestShema.parse(req.body);
    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        id: true,
      },
    });
    if (!user) {
      reply.code(404).send({ error: "User not found" });
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
          userId,
        },
      });
      reply.send(task);
    } catch (err) {
      reply.code(400).send({ error: "some thing goes wrong" });
    }
  });

  // Atualizar, listar, deletar tarefas
  app.get("/tasks", async (req, reply) => {
    const userCredentials = z.object({
      userId: z.number(),
    });

    const { userId } = userCredentials.parse(req.query);

    const tasks = await prisma.task.findMany({ where: { userId } });
    reply.send(tasks);
  });

  app.put("/tasks/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const { title, description, dueDate, statusId, categoryId } = req.body as {
      title?: string;
      description?: string;
      dueDate?: string;
      statusId?: number;
      categoryId?: number;
    };

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

    reply.send(updatedTask);
  });

  app.delete("/tasks/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    await prisma.task.delete({ where: { id: parseInt(id) } });
    reply.send({ message: "Task deleted" });
  });
}
