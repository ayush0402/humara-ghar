import { NextApiRequest } from 'next';
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';


export const POST = async (req: Request) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const data = await req.json();
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    const id = data.id;

    if (!id) {
        return NextResponse.json({ message: 'Invalid or missing query parameters' }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from('property_listings')
            .delete()
            .eq('listing_id', id)
            .select();

        if (error) {
            console.error('Error deleting property', error);
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }

        // Use router.replace to reload the page without adding a new entry to the browser's history
      //  router.replace(router.asPath);
        
        return NextResponse.json({ message: 'Property deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting property', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
