import {isImmutable} from 'immutable';
import isEmpty from "lodash/isEmpty";


export function isImmEmpty(list) {
    if (isImmutable(list)) {
        return list.size === 0;
    }
    return isEmpty(list);
}
