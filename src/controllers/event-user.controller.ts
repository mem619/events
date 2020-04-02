import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Event, User} from '../models';
import {EventRepository} from '../repositories';

export class EventUserController {
  constructor(
    @repository(EventRepository) protected eventRepository: EventRepository,
  ) {}

  @get('/events/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Event',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Event.prototype.id,
  ): Promise<User> {
    return this.eventRepository.owner(id);
  }

  @get('/events/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Event has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.eventRepository.participants(id).find(filter);
  }

  @post('/events/{id}/users', {
    responses: {
      '200': {
        description: 'Event model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Event.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInEvent',
            exclude: ['id'],
            optional: ['eventId'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.eventRepository.participants(id).create(user);
  }

  @patch('/events/{id}/users', {
    responses: {
      '200': {
        description: 'Event.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.eventRepository.participants(id).patch(user, where);
  }

  @del('/events/{id}/users', {
    responses: {
      '200': {
        description: 'Event.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.eventRepository.participants(id).delete(where);
  }
}
