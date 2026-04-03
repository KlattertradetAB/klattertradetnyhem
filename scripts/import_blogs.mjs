import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const envContent = readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) env[parts[0].trim()] = parts[1].trim().replace(/^\"(.*)\"$/, '$1');
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const ADMIN_ID = '0b98a7ca-733b-4dff-8300-0326728f690a';
const CONTENT_FILE = '/tmp/blog_content_docx.txt';

async function importBlogs() {
    try {
        const fullContent = readFileSync(CONTENT_FILE, 'utf8');
        // Split by the exact delimiter found in the file
        const rawSections = fullContent.split('---FILE---').filter(s => s.trim().length > 0);

        console.log(`Found ${rawSections.length} sections to process.`);

        for (const section of rawSections) {
            const lines = section.trim().split('\n');
            if (lines.length < 3) continue;

            // Line 1 is the filename (e.g. "Att Känna Världen Genom Kroppen.docx")
            // Line 2 is often the actual headline
            const fileName = lines[0].trim();
            const headline = lines[1].trim();
            
            const title = headline || fileName.replace('.docx', '').replace(/_/g, ' ');
            const content = lines.slice(1).join('\n').trim();
            const description = lines.slice(2, 5).join(' ').substring(0, 160) + '...';

            console.log(`Importing: ${title}`);

            const { data, error } = await supabase
                .from('blogs')
                .insert([
                    {
                        title,
                        description,
                        content,
                        user_id: ADMIN_ID,
                        author_name: 'Jeanette Johansson',
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) {
                console.error(`Error importing "${title}":`, error.message);
            } else {
                console.log(`Successfully imported: ${title}`);
            }
        }
        
        console.log('Import task complete.');

    } catch (err) {
        console.error('Import failed:', err.message);
    }
}

importBlogs();
