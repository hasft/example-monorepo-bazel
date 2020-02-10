import get from 'lodash.get';

export default function(path) {
    const separatePathAndQuery = /([^\?]+)(\?.*)?/g.exec(path); // eslint-disable-line
    const basePath = get(separatePathAndQuery, [1]);
    const params = get(separatePathAndQuery, [2]);
    const listOfDir = basePath.split("/").slice(1);
    
    return {
        basePath,
        params,
        dir: listOfDir
    };
}
