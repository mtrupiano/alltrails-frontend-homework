![AllTrails at lunch Logo](/src/assets/logo-lockup.svg)

# AllTrails at Lunch (AllTrails Spring 2025 Frontend Homework)
#### Submitted by [Mark Trupiano](https://mtru-portfolio-next.netlify.app/)
This is my homework submission for an AllTrails frontend software engineering position (Spring 2025). Please don't hesitate to reach out with any questions or if you have any issues running my project at mtrupiano2@gmail.com. Thank you for your consideration.

## Deployed
https://alltrails-frontend-homework.vercel.app/

## Local
1. Clone code from https://github.com/mtrupiano/alltrails-frontend-homework
2. Copy environment variables into a `.env` file at project root

    - `NEXT_PUBLIC_GOOGLE_PLACES_LEGACY_API_KEY` - Key for [Legacy Places API](https://developers.google.com/maps/documentation/places/web-service/overview-legacy) (provided by AllTrails)
    - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key to use latest version of [JavaScript API and React implementation](https://mapsplatform.google.com/resources/blog/streamline-the-use-of-the-maps-javascript-api-within-your-react-applications/) (personal key, reach out to mtrupiano2@gmail.com for access)
    - `NEXT_PUBLIC_GOOGLE_MAPS_STYLE_ID` - Style ID to enable [cloud-based styling](https://mapstyle.withgoogle.com/), **required** when using [Advanced Markers](https://visgl.github.io/react-google-maps/docs/api-reference/components/advanced-marker) (personal, reach out to mtrupiano2@gmail.com for access)
3. Install dependencies: `npm i` or `npm install`
4. Run development server: `npm run dev`
5. Open http://localhost:3000 in browser

## Testing
`npm run test`

## Write Up
Overall I had a great time making this project! I tried adding some bonus fun features while also incorporating all of the functionality I worked out from the designs. I definitely made some autonomous design decisions that if this were an actual work project I would want to discuss with product designers and/or stakeholders, but I think I got all of the major functionality covered.

### NextJS, TypeScript, React, TailwindCSS
I chose to build this project in NextJS / React with TailwindCSS for styling. The NextJS platform is well documented and requires  minimal configuration for getting a React application up and running. As for styling, I’ve found that TailwindCSS allows for really rapid prototyping compared to relying on a 3rd party component library. It also enforces more uniformity with minimal configuration out-of-the-box as opposed to relying on in-line styles or other styling frameworks.

### Searching
Calls NextJS server action to hit Google Places (Legacy) API. This is an old version of the API but I chose to still use it to try and stick with the project specifications (as much as I could, see below…). Unfortunately the legacy API does not have any typing libraries available, so I ended up manually writing types for data objects returned from this API as copied from the [API’s documentation](https://developers.google.com/maps/documentation/places/web-service/search-text#text-search-responses).

### Google Maps React
I had trouble getting the provided API key to work when putting a google map instance in my react app. In order to use the [latest google maps react implementation](https://mapsplatform.google.com/resources/blog/streamline-the-use-of-the-maps-javascript-api-within-your-react-applications/) I had to make my own personal Google Maps API key. Please reach out to me if you need this key.

### State management
When designing this app I knew I would have to rely on passing around state between components in order to keep track of things like search results and the selected restaurant. I initially started out with state objects but eventually moved to context providers when passing around the state got too unwieldy.

### Bookmarking
I wanted to implement bookmarking but wanted to avoid creating a database for the sake of minimizing the project’s scope. I chose to use localStorage just as a prototype / proof of concept. I mainly rely on a state object to keep track of bookmarked restaurants while the app is in use but write to localStorage on a slightly less reactive basis (debounced) to avoid excessive writes.

### Infinite scroll pagination
Using [`react-intersection-observer`](https://www.npmjs.com/package/react-intersection-observer); when the user scrolls to the bottom of the list view the intersection observer will call another server action with a `nextPageToken` to get the next page of search results from the Places API.

## Attributions
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and deployed on [Vercel](https://vercel.com/).
