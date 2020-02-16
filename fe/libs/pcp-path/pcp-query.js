import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import parseQuery from './parseQuery';
import pcpFilter from './pcp-filter';

export class PcpQuery {
    constructor(query, customQuery) {
        this.query = query;
        this.customQuery = customQuery;
    }

    stringify() {
        return '';
    }

    parse() {
        const parsedQuery = parseQuery(this.query);
        const cat_id = get(this.customQuery, 'category_id', null);
        const cat_name = get(this.customQuery, 'category_name', null);
        const fq = get(parsedQuery, 'fq', null);
        const parsedFilter = fq ? pcpFilter(fq).parse() : fq;

        return {
            category_id: cat_id,
            category_name: cat_name,
            fq: parsedFilter
        };
    }
}

export default function pcpQuery(query, customQuery) {
    return new PcpQuery(query, customQuery);
}
