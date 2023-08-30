const getUrlforCoffeeStores = (query, latlong, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`
}

const getCoffeStoresPhotos = (link) => {
    return `https://api.foursquare.com${link}/photos?limit=1&sort=POPULAR`
}

export const fetchCoffeeStores = async (latLong, limit) => {
    if(!latLong) latLong = "40.7588459,-73.9848941";
    if(!limit) limit = 6

    const options = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        Authorization: process.env.NEXT_PUBLIC_FOURSAUTH
        }
    };
    try {

        const response = await fetch(getUrlforCoffeeStores("coffee", latLong, limit), options)
        const data = await response.json()
        // console.log('STORES', data)

        const result = await Promise.all(data.results.map(async (venue) => {
            const photoResponse = await fetch(getCoffeStoresPhotos(venue.link), options);
            const storePhoto = await photoResponse.json()
            const photo = storePhoto[0].prefix + '400x400' + storePhoto[0].suffix
            // console.log('Store:', photo)
            return {
                ...venue,
                imgUrl: photo
            }
        }));

        return result;

    } catch(error) {
        return error
    }

}