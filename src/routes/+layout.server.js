import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { redirect } from '@sveltejs/kit';


export const load = async () => {
    const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    const {data, err} = await supabaseClient.from('Loads').select('*').eq('id', 1).single();

    if (!err) {
        data.Counter += 1;

        await supabaseClient.from('Loads').update({Counter: data.Counter}).eq('id', 1)
        
        if (data.Counter % 2 === 0) {
            throw redirect(302, 'https://natdoor-one.vercel.app/');
        }
        else {
            throw redirect(302, 'https://natdoor-two.vercel.app/');
        }

    }
};