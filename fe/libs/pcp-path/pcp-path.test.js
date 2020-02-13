import pcpPath, {PcpPath} from './pcp-path';

test("handle pcp path without arg", () => {
    expect(pcpPath()).toBe(undefined);
});

test("handle pcp path with empty string arg", () => {
    expect(pcpPath('')).toBe(undefined);
});

test("instanceOf PcpPath", () => {
    expect(pcpPath('/category')).toBeInstanceOf(PcpPath);
});

test("get categoryId", () => {
    expect(pcpPath('/category/p-206').getCategoryId()).toBe('206');
    expect(pcpPath('/category/p-8642793').getCategoryId()).toBe('8642793');
    expect(pcpPath('/category').getCategoryId()).toBe(null);
    expect(pcpPath('/category/wanita').getCategoryId()).toBe(null);
});

test("get categoryName", () => {
    expect(pcpPath('/category/p-206').getCategoryName()).toBe(null);
    expect(pcpPath('/category/wanita').getCategoryName()).toBe('wanita');
    expect(pcpPath('/category/wanita/pakaian').getCategoryName()).toBe('wanita,pakaian');
    expect(pcpPath('/category/wanita/pakaian/kemeja/nevada').getCategoryName()).toBe('wanita,pakaian,kemeja');
});

test("get brandOnPath", () => {
    expect(pcpPath('/category/p-206').getBrandOnPath()).toBe(null);
    expect(pcpPath('/category/wanita').getBrandOnPath()).toBe(null);
    expect(pcpPath('/category/wanita/pakaian').getBrandOnPath()).toBe(null);
    expect(pcpPath('/category/wanita/pakaian/kemeja/nevada').getBrandOnPath()).toBe('nevada');
    expect(pcpPath('/category/wanita/pakaian/kemeja/nevada--cardinal').getBrandOnPath()).toBe('nevada--cardinal');
});
