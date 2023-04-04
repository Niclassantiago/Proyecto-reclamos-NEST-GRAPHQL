import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reclamo } from './entity/reclamo.entity';
import { ReclamoResolver } from './reclamo.resolver';
import { ReclamoService } from './reclamo.service';

@Module({
  providers: [
    ReclamoResolver, 
    ReclamoService
  ],
  imports: [
    TypeOrmModule.forFeature([ Reclamo ])
  ]
})
export class ReclamoModule {}
