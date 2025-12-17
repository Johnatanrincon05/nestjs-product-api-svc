import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiCreatedResponse({
    description: 'Producto creado correctamente',
    schema: {
      example: {
        message: 'success',
        data: { id: 1, nombre: 'Camiseta', descripcion: 'Camiseta de algodón, talla M', precio: 19.99 },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos',
    schema: {
      example: {
        message: 'Datos inválidos',
        error: { statusCode: 400, message: ['precio must be a positive number'], error: 'Bad Request' },
      },
    },
  })
  create(@Body() dto: CreateProductDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar productos' })
  @ApiOkResponse({
    description: 'Lista de productos',
    schema: {
      example: {
        message: 'success',
        data: [
          { id: 1, nombre: 'Camiseta', descripcion: 'Camiseta de algodón, talla M', precio: 19.99 },
        ],
      },
    },
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por id' })
  @ApiOkResponse({ description: 'Producto encontrado' })
  @ApiOkResponse({
    description: 'Producto encontrado',
    schema: {
      example: {
        message: 'success',
        data: { id: 1, nombre: 'Camiseta', descripcion: 'Camiseta de algodón, talla M', precio: 19.99 },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Producto no encontrado',
    schema: {
      example: {
        message: 'Producto 1 no existe',
        error: { statusCode: 404, message: 'Producto 1 no existe' },
      },
    },
  })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiOkResponse({
    description: 'Producto actualizado',
    schema: {
      example: {
        message: 'success',
        data: { id: 1, nombre: 'Camiseta actualizada', descripcion: 'Nueva descripción', precio: 21.5 },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Datos inválidos',
    schema: {
      example: {
        message: 'Datos inválidos',
        error: { statusCode: 400, message: ['nombre should not be empty'], error: 'Bad Request' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Producto no encontrado',
    schema: {
      example: {
        message: 'Producto 1 no existe',
        error: { statusCode: 404, message: 'Producto 1 no existe' },
      },
    },
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiOkResponse({
    description: 'Producto eliminado',
    schema: {
      example: {
        message: 'success',
        data: { message: 'Producto 1 eliminado' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Producto no encontrado',
    schema: {
      example: {
        message: 'Producto 1 no existe',
        error: { statusCode: 404, message: 'Producto 1 no existe' },
      },
    },
  })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
