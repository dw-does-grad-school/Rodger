import { pipeline } from '@xenova/transformers';

export const generateEmbeddings = async (text) => {
    const pipe = await pipeline('feature-extraction', 'Supabase/gte-small');
    const output = await pipe(text, {
        pooling: "mean", 
        normalize: true
    });
    return Array.from(output.data);
}

// Wrap the console.log in an async IIFE to properly handle the async function
(async () => {
    try {
        const embeddings = await generateEmbeddings("Hello, world!");
        console.log(embeddings);
    } catch (error) {
        console.error('Error:', error);
    }
})();


