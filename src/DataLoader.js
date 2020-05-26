const {Client, Status} = require("@googlemaps/google-maps-services-js");
const APIKey = 'APIKEYHERE';
const client = new Client({});


const DataLoader = (searchString) => {
    return client.textSearch({
        params: {
            query: searchString,
            key: APIKey,
        },
        timeout: 1000, 
    })
    .then((r) => {
        if (r.data.status === Status.OK) {
            console.log({x: r.data.results[0].geometry.location.lng, y: r.data.results[0].geometry.location.lat});

            return {x: r.data.results[0].geometry.location.lng, y: r.data.results[0].geometry.location.lat};
        } else {
            console.log(r.data.error_message);
            throw r.data.error_message;
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

export default DataLoader