export const config = {
    baseURL: 'https://services.mataharimall.co',
    headers: {
        Authorization: null,
        device_id: '1234-1234-1234-1234',
        client_id: {
            desktop: 'mds_web',
            mobile: 'mds_mweb',
        },
        client_secret: {
            desktop: '60a114c91c41983174b484e188856fb3',
            mobile: '985bfd00b59026f51b057aee703b4106'
        }
    },
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
    initURL: '/v1/init?platform=mobilesite&version=1.22.0',
    bulkName: 'bulk_init'
};

export const githubconfig = {
    baseURL: 'https://api.github.com/users/octocat/orgs',
    headers: {
        Authorization: null,
        device_id: '',
        client_id: {
            desktop: '',
            mobile: '',
        },
        client_secret: {
            desktop: '',
            mobile: ''
        }
    },
    ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36",
    initURL: '',
    bulkName: 'bulk_init'
};

export const desiredHeaders = {
    Authorization: null,
    device_id: '1234-1234-1234-1234',
    client_id: 'mds_web',
    client_secret: '60a114c91c41983174b484e188856fb3'
};

export const initResponse = {
    data: {
        app_version: {},
        service_url: {
            lovelist: {
                url: "https://services.mataharimall.co/wishlist/v2",
                host: "lovelist"
            }
        },
    },
    ok: true,
    problem: null
};
