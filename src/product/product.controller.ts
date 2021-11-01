import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { PRODUCT_NOT_FOUND_ERROR } from './constants/product.constants';
import { CreateProductDTO } from './dto/create-product.dto';
import { FindProductDTO } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService){}

	@Post('create')
	async create(@Body() dto: CreateProductDTO){
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string){
		const product = await this.productService.findById(id);
		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return product;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string){
		const deleted = await this.productService.deleteById(id);
		if (!deleted) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
	}

	@Patch(':id')
	async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel){
		const updated = await this.productService.updateById(id, dto);
		if (!updated) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return updated;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDTO){
		return this.productService.findWithReviews(dto);
	}
}
