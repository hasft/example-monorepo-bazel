import pcpFilter, {PcpFilter} from './pcp-filter';

test("test parse fq", () => {
    expect(pcpFilter("brand_id:200,brand_name:nevada").parse()).toEqual({brand_id: "200", brand_name: "nevada"});
});
