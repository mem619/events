import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {Place} from './place.model';

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

  @belongsTo(() => User)
  ownerId: string;

  @belongsTo(() => Place)
  placeId: string;

  @hasMany(() => User)
  participants: User[];
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
