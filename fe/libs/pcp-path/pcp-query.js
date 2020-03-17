import get from 'lodash.get';
import isEmpty from 'lodash.isempty';
import parseQuery from './parseQuery';
import pcpFilter from './pcp-filter';

export class PcpQuery {
    constructor(query, customQuery, customFilter) {
        this.query = query;
        this.customQuery = customQuery;
        this.customFilter = customFilter;
    }

    parse() {
        const parsedQuery = parseQuery(this.query);
        const cat_id = get(this.customQuery, 'category_id', null);
        const cat_name = get(this.customQuery, 'category_name', null);
        const filter = get(parsedQuery, 'fq', null);

        const parsedFilter = pcpFilter(filter, this.customFilter).parse();

        return {
            ...parsedQuery,
            category_id: cat_id,
            category_name: cat_name,
            fq: parsedFilter
        };
    }
}

export default function pcpQuery(query, customQuery, customFilter) {
    return new PcpQuery(query, customQuery, customFilter);
}
