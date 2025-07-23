import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import z from "zod";

const CategoryEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
]);
class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: "Informe o nome da solicitação" }),
      category: CategoryEnum,
      amount: z.number().positive({ message: "O numero precisa ser positivo" }),
      filename: z.string().min(20),
    });

    const { name, category, amount, filename } = bodySchema.parse(request.body);

    if (!request.user?.id) {
      throw new AppError("Unauthorizaded", 401);
    }
    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user.id,
      },
    });

    response.status(201).json({ refund });
  }
  async index(request: Request, response: Response) {
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    });

    const { name, page, perPage } = querySchema.parse(request.query);

    //Caucular os valores de skip
    const skip = (page - 1) * perPage;

    const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    //Obter o total de registros para caucular a quanidade de paginas.
    const totalRecords = await prisma.refunds.count({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
    });
    const totalPages = Math.ceil(totalRecords / perPage);
    response.json({
      refunds,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
      },
    });
  }
  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });
    const { id } = paramsSchema.parse(request.params);
    const refund = await prisma.refunds.findFirst({
      where: { id },
      include: { user: true },
    });

    response.json(refund);
  }
}

export { RefundsController };
