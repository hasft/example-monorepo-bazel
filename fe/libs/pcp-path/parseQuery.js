import qs from 'qs';

export default function(query) {
    return qs.parse(query, {ignoreQueryPrefix: true});
}
