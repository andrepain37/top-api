import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';


class HhDataDTO{
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

class TopPageAdvatageDTO{
	@IsString()
	title: string;

	@IsString()
	description: string;
}
export class CreateTopPageDTO{

	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsString()
	alias: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => HhDataDTO)
	hh?: HhDataDTO;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvatageDTO)
	advantages: TopPageAdvatageDTO[];

	@IsString()
	seoText: string;

	@IsArray()
	@IsString({each: true})
	tags: string[];

	@IsString()
	tagsTitle: string;
}
