import { supabase } from "./supabase.js";

const testConnection = async () => {
    try {
        // Test basic connection
        const { data: tableData, error: tableError } = await supabase
            .from('movies')
            .select('count')
            .limit(1);

        if (tableError) {
            console.error('Error connecting to movies table:', tableError.message);
            return;
        }

        console.log('Successfully connected to Supabase!');
        console.log('Movies table is accessible');
        
        // Get total count of movies
        const { count, error: countError } = await supabase
            .from('movies')
            .select('*', { count: 'exact', head: true });

        if (countError) {
            console.error('Error getting movie count:', countError.message);
            return;
        }

        console.log(`Total number of movies in database: ${count}`);

    } catch (error) {
        console.error('Connection test failed:', error.message);
    }
};

// Run the test
testConnection(); 