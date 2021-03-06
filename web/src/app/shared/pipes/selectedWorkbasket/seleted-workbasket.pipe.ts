import { Pipe, PipeTransform } from '@angular/core';
import { TaskanaQueryParameters } from 'app/shared/util/query-parameters';

@Pipe({ name: 'selectWorkbaskets' })
export class SelectWorkBasketPipe implements PipeTransform {
    transform(originArray: any, selectionArray: any, arg1: any): Object[] {
        let returnArray = [];
        if (!originArray || !selectionArray) {
            return returnArray;
        }

        for (let index = originArray.length - 1; index >= 0; index--) {
            if ((arg1 && !selectionArray.some(elementToRemove => {
                return originArray[index].workbasketId === elementToRemove.workbasketId
            })) ||
                !arg1 && selectionArray.some(elementToRemove => {
                    return originArray[index].workbasketId === elementToRemove.workbasketId
                })) {
                originArray.splice(index, 1);
            }
        }
        if (originArray.length > TaskanaQueryParameters.pageSize) {
          originArray.slice(0, TaskanaQueryParameters.pageSize);
        }
        returnArray = originArray;
        return returnArray;
    }
}
