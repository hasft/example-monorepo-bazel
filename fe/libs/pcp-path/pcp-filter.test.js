import pcpFilter, {PcpFilter} from './pcp-filter';

test("test parse fq", () => {
    expect(pcpFilter("brand_id:200,brand_name:nevada,size:X,size:L").parse())
        .toEqual({
            brand_id: ["200"],
            brand_name: ["nevada"],
            size: ["X", "L"]
        });
    
    expect(pcpFilter("brand_id:200,brand_name:nevada,size:X,size:L,price:2000-4000").parse())
        .toEqual({
            brand_id: ["200"],
            brand_name: ["nevada"],
            size: ["X", "L"],
            price: ["2000-4000"]
        });
});

test("custom filter", () => {
    expect(pcpFilter(
        "brand:200,size:X,brand_name:adidas",
        [{
            label: 'brand_name',
            value: 'nevada--cardinal',
            splitter: '--'
        },{
            label: 'something',
            value: 'a'
        }]).parse())
        .toEqual({brand: ['200'], size: ['X'], brand_name: ['nevada', 'cardinal', 'adidas'], something: ['a']});

    expect(pcpFilter(
        "brand:200,size:X,brand_name:adidas",
        [{
            label: 'brand_name',
            value: null,
            splitter: '--'
        },{
            label: 'something',
            value: 'a'
        }]).parse())
        .toEqual({brand: ['200'], size: ['X'], brand_name: ['adidas'], something: ['a']});
});
