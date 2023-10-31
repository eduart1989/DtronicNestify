import {
  IsOptional,
  IsInt,
  IsEnum,
  IsNumber,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import {
  MaritalStatus,
  DefaultStatus,
  HousingStatus,
  LoanStatus,
  ContactMethod,
  Month,
  DayOfWeek,
  POutcome,
  TargetStatus,
} from './bank.enums';

export class EditBankDto {
  @IsInt()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  job: string;

  @IsEnum(MaritalStatus)
  @IsOptional()
  marital: MaritalStatus;

  @IsString()
  @IsOptional()
  education: string;

  @IsEnum(DefaultStatus)
  @IsOptional()
  default: DefaultStatus;

  @IsEnum(HousingStatus)
  @IsOptional()
  housing: HousingStatus;

  @IsEnum(LoanStatus)
  @IsOptional()
  loan: LoanStatus;

  @IsEnum(ContactMethod)
  @IsOptional()
  contact: ContactMethod;

  @IsEnum(Month)
  @IsOptional()
  month: Month;

  @IsEnum(DayOfWeek)
  @IsOptional()
  day_of_week: DayOfWeek;

  @IsInt()
  @IsOptional()
  duration: number;

  @IsInt()
  @IsOptional()
  campaign: number;

  @IsInt()
  @IsOptional()
  pdays: number;

  @IsInt()
  @IsOptional()
  previous: number;

  @IsEnum(POutcome)
  @IsOptional()
  poutcome: POutcome;

  @IsNumber({})
  @IsOptional()
  emp_var_rate: number;

  @IsNumber({})
  @IsOptional()
  cons_price_idx: number;

  @IsNumber({})
  @IsOptional()
  cons_conf_idx: number;

  @IsNumber({})
  @IsOptional()
  euribor3m: number;

  @IsNumber({})
  @IsOptional()
  nr_employed: number;

  @IsEnum(TargetStatus)
  @IsOptional()
  y: TargetStatus;
}
