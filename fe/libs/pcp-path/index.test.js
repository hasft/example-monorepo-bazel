import {pcpPath} from './index';

const query_string = {
  category_id: ''
}

test("path is catch category_id", () => {
  expect(pcpPath('/category/p-2016').parse().query).toStrictEqual({ category_id: 'p-2016'});
});
