import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import prisma from "../lib/prima";
import { z } from "zod";

export default async function userRoutes(app: FastifyInstance) {
  app.post("/register", async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string };
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });
      reply.send({ id: user.id, email: user.email });
    } catch (err) {
      reply.code(400).send({ error: "User already exists" });
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
      reply.send({ items: users, total: users.length });
    } catch (err) {
      reply.code(400).send({ error: "some thing goes wrong" });
    }
  });
}
