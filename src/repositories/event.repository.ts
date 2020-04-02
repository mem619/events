import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Event, EventRelations, User} from '../models';
import {EventsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {

  public readonly owner: BelongsToAccessor<User, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.events') dataSource: EventsDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Event, dataSource);
    this.owner = this.createBelongsToAccessorFor('owner', userRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
  }
}
