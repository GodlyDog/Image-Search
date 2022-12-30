
function searchImages(searchTerm) {
        let url = `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY}
     &cx=${process.env.REACT_APP_ENGINE_ID}&q=${searchTerm}&searchType=image&num=7`
        return fetch(url).then(function (response) {
            console.log(response);
            const json = response.json();
            console.log(json);
            return json;
        })
}

function searchVideos(searchTerm) {
    let url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_YOUTUBE_KEY}&q=${searchTerm}
    &num=2&type=video`;
    return fetch(url).then(function (response) {
        console.log(response);
        const json = response.json();
        console.log(json);
        return json;
    })
}

export {searchImages, searchVideos};