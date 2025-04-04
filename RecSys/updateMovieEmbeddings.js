import { supabase } from "./supabase.js";
import { generateEmbeddings } from "./generateEmbeddings.js";

const getMovies = async () => {
    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .is('embedding', null);
    
    if (error) {
        console.error('Error fetching movies:', error);
        return null;
    }
    return data;
}

// Main execution
(async () => {
    try {
        const movies = await getMovies();
        
        if (!movies) {
            console.error('No movies data available');
            process.exit(1);
        }

        console.log(`Found ${movies.length} movies without embeddings`);
        
        // Process each movie
        for (const movie of movies) {
            try {
                // Generate embedding for movie title + overview
                const text = `${movie.title} ${movie.overview || ''}`.trim();
                const embedding = await generateEmbeddings(text);
                
                // Update movie with embedding
                const { error: updateError } = await supabase
                    .from('movies')
                    .update({ embedding })
                    .eq('id', movie.id);
                
                if (updateError) {
                    console.error(`Error updating movie ${movie.id}:`, updateError);
                    continue;
                }
                
                console.log(`Updated embedding for movie: ${movie.title}`);
            } catch (err) {
                console.error(`Error processing movie ${movie.title}:`, err);
            }
        }
        
        console.log('Finished updating movie embeddings');
    } catch (err) {
        console.error('Error in main execution:', err);
        process.exit(1);
    }
})();