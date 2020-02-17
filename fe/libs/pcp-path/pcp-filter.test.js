import pcpFilter, {PcpFilter} from './pcp-filter';

test("test parse fq", () => {
    expect(pcpFilter("brand_id:200,brand_name:nevada").parse()).toEqual({brand_id: "200", brand_name: "nevada"});
});

test("test parse fq with brandName", () => {
    expect(pcpFilter("brand_id:200", "nevada--cardinal").parse()).toEqual({brand_id: "200", brand_name: "nevada", brand_name: "cardinal"});
});
