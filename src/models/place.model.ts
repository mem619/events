import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Place extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  street: string;

  @property({
    type: 'number',
  })
  number?: number;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'number',
  })
  zip?: number;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Place>) {
    super(data);
  }
}

export interface PlaceRelations {
  // describe navigational properties here
}

export type PlaceWithRelations = Place & PlaceRelations;
