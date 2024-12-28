import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import prisma from "../lib/prima";
import { z } from "zod";

export default async function userRoutes(app: FastifyInstance) {
  app.post("/register", async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string };
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const hasUser = await prisma.user.findUnique({ where: { email: email } });

      if (hasUser) {
        reply.code(409).send({ error: "O email já está em uso" });
        return;
      }

      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });

      reply.code(201).send({
        data: { id: user.id, email: user.email },
        message: "Usuário criado com sucesso",
      });
    } catch (err) {
      reply.code(400).send({ error: "Erro ao criar a conta" });
    }
  });

  app.post("/login", async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string };

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      reply.code(401).send({ error: "Invalid email or password" });
      return;
    }

    //const token = app.jwt.sign({ id: user.id, email: user.email });
    reply.send({ token: "token" });
  });

  app.delete("/users", async (req, reply) => {
    const userCredentials = z.object({
      userId: z.number(),
    });

    const { userId } = userCredentials.parse(req.query);

    await prisma.task.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });

    reply.send({ message: "User and tasks deleted" });
  });

  app.get("/users", async (req, reply) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          email: true,
          id: true,
          tasks: true,
        },
      });

      if (!users.length) {
        reply.send({
          data: users,
          message: "lista vazia",
          total: users.length,
        });
        return;
      }

      reply.send({
        data: users,
        message: "lista encotrada",
        total: users.length,
      });
    } catch (err) {
      reply.code(400).send({ message: "algum erro desconhecido" });
    }
  });

  app.get("/users/:id", async (req, reply) => {
    const userCredentials = z.object({
      id: z.string(),
    });

    const { id } = userCredentials.parse(req.params);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          email: true,
          id: true,
          tasks: true,
        },
      });

      if (!user) {
        reply.code(204).send({ data: user, message: "Usuário não encotrado" });
        return;
      }
      reply
        .code(200)
        .send({ data: user, message: "Usuário encotrado com sucesso" });
    } catch (err) {
      reply.code(400).send({ message: "algum erro desconhecido" });
    }
  });
}
