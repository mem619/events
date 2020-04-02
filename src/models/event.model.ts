import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Place} from './place.model';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Event extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
  })
  capacity?: number;

  @property({
    type: 'string',
    required: true,
  })
  topPhoto: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  exposedPhotos?: string[];

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  participants?: object[];

  @belongsTo(() => User)
  ownerId: string;

  @belongsTo(() => Place)
  placeId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Event>) {
    super(data);
  }
}

export interface EventRelations {
  // describe navigational properties here
}

export type EventWithRelations = Event & EventRelations;
