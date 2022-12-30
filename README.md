This app was created with npm and create-react-app. Compiling scripts are below.

This app uses the Google custom search api, and the YouTube video search api.
To search, enter any search query in the search box, then press enter. The last two images
that appear in the bottom row will be video thumbnails from YouTube, and the rest
will be images from Google search. To select an image, just click on it. To download the
selected image links in JSON format, click DOWNLOAD JSON. The JSON file will be in the format
{search term: [{image link: context link}]} for Google images and {search term: [{thumbnail link: video id}]} for YouTube videos.

Note: Image results will often repeat, as the Google API tends to have repeats for some queries,
and CORS will sometimes block image results from appearing.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
