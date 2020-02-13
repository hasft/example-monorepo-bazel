import isEmpty from 'lodash.isempty';
import parseQuery from './parseQuery';

export class PcpQuery {
    constructor(query, customQuery) {
        this.query = query;
        this.customQuery = customQuery;
    }

    collectBrand(brandOnPath, brandOnFq) {
        
    }

    stringify() {
        
    }

    parse() {
        return {
            ...this.query,
            category_id: this.customQuery.category_id || null,
            category_name: this.customQuery.category_name || null
        };
    }
}

export default function pcpQuery(query, customQuery) {
    return new PcpQuery(query, customQuery);
}
