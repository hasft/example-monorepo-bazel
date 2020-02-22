import pcpQuery, {PcpQuery} from './pcp-query';

test("get pcp query instance", () => {    
    expect(pcpQuery('?a=2')).toBeInstanceOf(PcpQuery);
});

test("parse pcp query", () => {
    const x = {
        category_id: "206",
        category_name: null,
        fq: null
    };
    
    expect(pcpQuery(null, {category_id: null, category_name: 'wanita'}).parse())
        .toEqual({...x, category_id: null, category_name: 'wanita'});

    expect(pcpQuery({fq: "size:X"}, {category_id: null, category_name: 'wanita'}).parse())
        .toEqual({...x, category_id: null, category_name: 'wanita', fq: {size: ["X"]}});

    expect(pcpQuery({fq: "size:X,brand_name:nevada"}, {category_id: null, category_name: 'wanita'}).parse())
        .toEqual({...x, category_id: null, category_name: 'wanita', fq: {size: ["X"], brand_name: ['nevada']}});

});
