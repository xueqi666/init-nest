import { Controller, Get } from '@nestjs/common';

@Controller('echarts')
export class EchartsController {
  @Get('all')
  getEcharts() {
    return {
      code: 200,
      data: [
        {
          product: '衬衫',
          sales: 5,
          a: 1,
          b: 2,
        },
        {
          product: '羊毛衫',
          sales: 20,
        },
        {
          product: '雪纺衫',
          sales: 36,
        },
        {
          product: '裤子',
          sales: 10,
        },
        {
          product: '高跟鞋',
          sales: 10,
        },
      ],
      msg: 'success',
    };
  }
}
