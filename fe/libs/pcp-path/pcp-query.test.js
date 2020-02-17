import pcpQuery, {PcpQuery} from './pcp-query';

test("get pcp query instance", () => {    
    expect(pcpQuery('?a=2')).toBeInstanceOf(PcpQuery);
});

test("parse pcp query", () => {
    const x = {
        category_id: '206',
        category_name: null,
        fq: null
    };
    
    expect(pcpQuery(null, {category_id: null, category_name: 'wanita'}).parse())
        .toEqual({...x, category_id: null, category_name: 'wanita'});
    expect(pcpQuery(null, {category_id: '206', category_name: null}).parse())
        .toEqual({...x, category_id: '206'});
    expect(pcpQuery('?category_id=298', {category_id: '206', category_name: null}).parse())
        .toEqual({...x, category_id: '206'});
    expect(pcpQuery('?fq=brand:201,size:X,brand:404').parse())
        .toEqual({...x, category_id: null, category_name: null, fq: {brand: '201', brand: '404', size: 'X'}});
    expect(pcpQuery('?fq=brand:201,size:X,brand:404', {category_id: "206"}).parse())
        .toEqual({...x, category_id: "206", category_name: null, fq: {brand: '201', brand: '404', size: 'X'}});
});
