import isEmpty from 'lodash.isempty';

export class PcpFilter {
    constructor(fq) {
        this.fq = fq;
    }

    transform() {
        const splitted = this.fq.split(",");
        return splitted.reduce((acc, val, i) => {
            acc[val.split(":")[0]] = val.split(":")[1];
            return acc;
        }, {});
    }


    parse() {
        return this.transform();
    }
}

export default function pcpFilter(fq) {
    return new PcpFilter(fq);
}
