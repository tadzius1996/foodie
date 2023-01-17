import sanityClient from '@sanity/client';
import  ImageUrlBuilder  from '@sanity/image-url';

const client = sanityClient({
    projectId: 'mrgvmrbv',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-01-12'
})

const builder = ImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client