import isEmpty from 'lodash.isempty';

export class PcpFilter {
    constructor(fq, brandName) {
        this.fq = fq;
        this.brandName = brandName;
    }

    

    transformFq() {
        const splitted = this.fq.split(",");
        return splitted.reduce((acc, val, i) => {
            acc[val.split(":")[0]] = val.split(":")[1];
            return acc;
        }, {});
    }

    transformBrandName() {
        if (isEmpty(this.brandName)) return {};

        return this.brandName.split("--").reduce((acc, val) => {
            acc['brand_name'] = val;
            return acc;
        }, {});
    }


    parse() {
        const transformedFq = this.transformFq();
        const transformedBrandName = this.transformBrandName();

        return {...transformedFq, ...transformedBrandName};
    }
}

export default function pcpFilter(fq, brandName) {
    return new PcpFilter(fq, brandName);
}
