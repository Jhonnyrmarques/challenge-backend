import { Order, Prisma } from '@prisma/client'

export interface OrdersRepository {
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>
  updateOrder(data: Prisma.OrderUncheckedUpdateInput): Promise<void>
  findById(id: string): Promise<Order | null>
}