import {
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsNumber,
  IsString,
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

export class CreateBankDto {
  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  job: string;

  @IsEnum(MaritalStatus)
  @IsNotEmpty()
  marital: MaritalStatus;

  @IsString()
  @IsNotEmpty()
  education: string;

  @IsEnum(DefaultStatus)
  @IsNotEmpty()
  default: DefaultStatus;

  @IsEnum(HousingStatus)
  @IsNotEmpty()
  housing: HousingStatus;

  @IsEnum(LoanStatus)
  @IsNotEmpty()
  loan: LoanStatus;

  @IsEnum(ContactMethod)
  @IsNotEmpty()
  contact: ContactMethod;

  @IsEnum(Month)
  @IsNotEmpty()
  month: Month;

  @IsEnum(DayOfWeek)
  @IsNotEmpty()
  day_of_week: DayOfWeek;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsInt()
  @IsNotEmpty()
  campaign: number;

  @IsInt()
  @IsNotEmpty()
  pdays: number;

  @IsInt()
  @IsNotEmpty()
  previous: number;

  @IsEnum(POutcome)
  @IsNotEmpty()
  poutcome: POutcome;

  @IsNumber({})
  @IsNotEmpty()
  emp_var_rate: number;

  @IsNumber({})
  @IsNotEmpty()
  cons_price_idx: number;

  @IsNumber({})
  @IsNotEmpty()
  cons_conf_idx: number;

  @IsNumber({})
  @IsNotEmpty()
  euribor3m: number;

  @IsNumber({})
  @IsNotEmpty()
  nr_employed: number;

  @IsEnum(TargetStatus)
  @IsNotEmpty()
  y: TargetStatus;
}
