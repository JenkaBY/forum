import * as _ from 'underscore';

export function isInArray(arrayOfOnj: any[] | Set<any>, propertyName: string, lookingForValue: any): boolean {
  return _.indexOf(_.pluck(arrayOfOnj, propertyName), lookingForValue) >= 0;
}
