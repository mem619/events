import {DefaultCrudRepository} from '@loopback/repository';
import {Place, PlaceRelations} from '../models';
import {EventsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PlaceRepository extends DefaultCrudRepository<
  Place,
  typeof Place.prototype.id,
  PlaceRelations
> {
  constructor(
    @inject('datasources.events') dataSource: EventsDataSource,
  ) {
    super(Place, dataSource);
  }
}
