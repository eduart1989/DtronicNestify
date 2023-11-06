import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BankService } from './bank.service';
import {
  CreateBankDto,
  EditBankDto,
} from './dto';
import { Prisma } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('banks')
export class BankController {
  constructor(private bankService: BankService) {}

  @Get()
  async getBanks(
    @GetUser('id') userId: number,
    @Query(
      'page',
      new DefaultValuePipe(1),
      ParseIntPipe,
    )
    page: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(5),
      ParseIntPipe,
    )
    pageSize: number,
    @Query('filters') filters: string,
    @Query(
      'orders',
      new DefaultValuePipe('{"id": "desc"}'),
    )
    orders: string,
  ) {
    const filterParams: Prisma.BankWhereInput =
      {};

    if (filters) {
      const parsedFilters = JSON.parse(filters);
      for (const key in parsedFilters) {
        if (parsedFilters.hasOwnProperty(key)) {
          filterParams[key] = parsedFilters[key];
        }
      }
    }
    const orderParam = JSON.parse(orders);
    const paginationParams: Prisma.BankFindManyArgs =
      {
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: orderParam,
      };

    return this.bankService.getBanks(
      userId,
      filterParams,
      paginationParams,
    );
  }

  @Get(':id')
  getBankById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bankId: number,
  ) {
    return this.bankService.getBankById(
      userId,
      bankId,
    );
  }

  @Post()
  createBank(
    @GetUser('id') userId: number,
    @Body() dto: CreateBankDto,
  ) {
    return this.bankService.createBank(
      userId,
      dto,
    );
  }

  @Post('/create-multiple')
  createMultipleBanks(
    @GetUser('id') userId: number,
    @Body() dto: CreateBankDto[],
  ) {
    return this.bankService.createMultipleBanks(
      userId,
      dto,
    );
  }

  @Patch(':id')
  editBankById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bankId: number,
    @Body() dto: EditBankDto,
  ) {
    return this.bankService.editBankById(
      userId,
      bankId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBankById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bankId: number,
  ) {
    return this.bankService.deleteBankById(
      userId,
      bankId,
    );
  }
}
