import parsePath from './parsePath';

test("get parsed path", () => {
    expect(parsePath('')).toBe(undefined);
    expect(parsePath('/a/b/c/d?q1=2')).toEqual({ query: '?q1=2', basePath: '/a/b/c/d', dir: ['a', 'b', 'c', 'd']});
});
