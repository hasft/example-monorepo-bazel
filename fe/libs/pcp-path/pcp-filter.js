import isEmpty from 'lodash.isempty';
import union from 'lodash.union';

export class PcpFilter {
    constructor(filter, customFilter) {
        this.filter = filter;
        this.customFilter = customFilter;
    }

    handleCustomFilter() {
        const transformedFilter = this.transformFilter();
        let parsedCustomFilter = this.customFilter.reduce((acc, obj, i) => {
            const mappedValue = obj.value && obj.splitter ? obj.value.split(obj.splitter) : [obj.value];

            if(obj.value) {
                acc[obj.label] = mappedValue;                
            }

            return acc;
        }, {});

        parsedCustomFilter = Object.keys(parsedCustomFilter).reduce((acc, value) => {
            acc[value] = transformedFilter[value] ? union(parsedCustomFilter[value], transformedFilter[value]) : parsedCustomFilter[value];
            return acc;
        }, {});


        return Object.assign(transformedFilter, parsedCustomFilter);
    }
    
    transformFilter() {
        if(!isEmpty(this.filter)) {
            const splitted = this.filter.split(",");
            
            return splitted.reduce((acc, val) => {
                const l = val.split(":")[0];
                const v = val.split(":")[1];
                acc[l] = acc[l] ? [...acc[l], v] : [v];
                return acc;
            }, {});
        } else {
            return this.filter;
        }       
    }


    parse() {
        const transformedFilter = this.customFilter ? this.handleCustomFilter() : this.transformFilter();
        return transformedFilter;
    }
}

export default function pcpFilter(filter, customFilter) {
    return new PcpFilter(filter, customFilter);
}
