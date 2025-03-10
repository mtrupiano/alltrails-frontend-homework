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

## Attributions
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and deployed on [Vercel](https://vercel.com/).
