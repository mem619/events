import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {EventsDataSource} from '../datasources';
import {Event, EventRelations, Place, User} from '../models';
import {PlaceRepository} from './place.repository';
import {UserRepository} from './user.repository';

export class EventRepository extends DefaultCrudRepository<
  Event,
  typeof Event.prototype.id,
  EventRelations
> {
  public readonly owner: BelongsToAccessor<User, typeof Event.prototype.id>;

  public readonly place: BelongsToAccessor<Place, typeof Event.prototype.id>;

  constructor(
    @inject('datasources.events') dataSource: EventsDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
    @repository.getter('PlaceRepository')
    protected placeRepositoryGetter: Getter<PlaceRepository>,
  ) {
    super(Event, dataSource);
    this.place = this.createBelongsToAccessorFor(
      'place',
      placeRepositoryGetter,
    );
    this.registerInclusionResolver('place', this.place.inclusionResolver);
    this.owner = this.createBelongsToAccessorFor('owner', userRepositoryGetter);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
  }
}
