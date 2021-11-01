import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { TOP_PAGE_NOT_FOUND_ERROR } from './constants/top-page.constants';
import { CreateTopPageDTO } from './dto/create-top-page.dto';
import { FindTopPageDTO } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {

	constructor(private readonly topPageService: TopPageService){}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateTopPageDTO){
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string){
		const page = await this.topPageService.findById(id);
		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
		}
		return page;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string){
		const page = await this.topPageService.deleteById(id);
		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
		}
	}

	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string){
		const page = await this.topPageService.findByAlias(alias);
		if (!page) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
		}
		return page;
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel){
		const updatedPage = await this.topPageService.updateById(id, dto);
		if (!updatedPage) {
			throw new NotFoundException(TOP_PAGE_NOT_FOUND_ERROR);
		}
		return updatedPage;
	}

	@Get('textSearch/:text')
	async textSearch(@Param('text') text: string){
		return this.topPageService.findByText(text);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDTO){
		return this.topPageService.findByCategory(dto.firstCategory);
	}
}
