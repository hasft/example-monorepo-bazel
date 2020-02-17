import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import parsePath from './parsePath';
import pcpQuery from './pcp-query';

export class PcpPath {
    constructor(path, query) {
        this.path = path;
        this.query = null;
    }

    getCategoryId() {
        const parsedPath = parsePath(this.path);
        const secondDir = get(parsedPath, ['dir', 1]);

        if (!secondDir) return null;
        
        const id = get(/p-[\d$]+/.exec(secondDir), [0], null);
        const splittedId = id ? id.split("-") : null;
        return get(splittedId, [1], null);
    }

    getCategoryName() {
        const parsedPath = parsePath(this.path);
        const listOfCategoryDir = get(parsedPath, 'dir').slice(1,4);
        return isEmpty(this.getCategoryId()) ? listOfCategoryDir.join() : null;
    }

    getBrandOnPath() {
        const parsedPath = parsePath(this.path);
        return get(parsedPath, ['dir', 4], null);
    }

    parse() {
        const parsedPath = parsePath(this.path);
        return {
            query: pcpQuery(
                parsedPath.query,
                {
                    category_id: this.getCategoryId(),
                    category_name: this.getCategoryName(),
                    brand_name: this.getBrandOnPath()
                }
            ).parse()
            
        };
    }
}

export default function pcpPath(path) {
    if(isEmpty(path)) {
        return undefined;
    }
    
    return new PcpPath(path);
}
