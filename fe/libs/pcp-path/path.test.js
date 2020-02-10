import parsePath from './parsePath';

test("get parsed path", () => {
    expect(parsePath('/a/b/c/d?q1=2')).toEqual({ params: '?q1=2', basePath: '/a/b/c/d', dir: ['a', 'b', 'c', 'd']});
    expect(parsePath('/a/b?q1=2&q2=3')).toEqual({ params: '?q1=2&q2=3', basePath: '/a/b', dir: ['a', 'b']});
});
