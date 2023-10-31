import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBankDto,
  EditBankDto,
} from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BankService {
  constructor(private prisma: PrismaService) { }

  async getBanks(
    userId: number,
    filterParams: Prisma.BankWhereInput,
    paginationParams: Prisma.BankFindManyArgs,
  ) {
    const pagination = {
      ...paginationParams,
    };

    return this.prisma.bank.findMany({
      where: {
        userId,
        ...filterParams,
      },
      ...pagination,
    });
  }

  getBankById(userId: number, bankId: number) {
    return this.prisma.bank.findFirst({
      where: {
        id: bankId,
        userId,
      },
    });
  }

  async createBank(
    userId: number,
    dto: CreateBankDto,
  ) {
    const bank = await this.prisma.bank.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bank;
  }

  async createMultipleBanks(
    userId: number,
    dto: CreateBankDto[],
  ): Promise<{ totalCreated: number }> {
    // You can reuse your existing createMultiple method to create multiple records
    const data = dto.map((bank) => ({
      userId,
      ...bank,
    }));
    const bank =
      await this.prisma.bank.createMany({ data });

    return { totalCreated: bank.count };
  }
  async editBankById(
    userId: number,
    bankId: number,
    dto: EditBankDto,
  ) {
    // get the bank by id
    const bank =
      await this.prisma.bank.findUnique({
        where: {
          id: bankId,
        },
      });

    // check if user owns the bank
    if (!bank || bank.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.bank.update({
      where: {
        id: bankId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBankById(
    userId: number,
    bankId: number,
  ) {
    const bank =
      await this.prisma.bank.findUnique({
        where: {
          id: bankId,
        },
      });

    // check if user owns the bank
    if (!bank || bank.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.bank.delete({
      where: {
        id: bankId,
      },
    });
  }
}
