import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ReclamoModule } from './reclamo/reclamo.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    
    ConfigModule.forRoot(),

    GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    //playground: false,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }), 
    ReclamoModule, UsersModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    })

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
