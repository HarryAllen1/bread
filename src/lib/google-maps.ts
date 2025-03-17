import { PUBLIC_GOOGLE_MAPS_API_KEY } from '$env/static/public';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
	apiKey: PUBLIC_GOOGLE_MAPS_API_KEY,
	version: 'weekly',
});

export const googleMaps = await loader.importLibrary('maps');
export const googleMarker = await loader.importLibrary('marker');
export const googleCore = await loader.importLibrary('core');
