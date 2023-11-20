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
    const action = data.action;
    //console.log(id+" "+action);

    if (!id || !action) {
        return NextResponse.json({ message: 'Invalid or missing query parameters' }, { status: 400 });
    }

    let value = 0;
    if (action === "approve") {
        value = 1;
    } else {
        value = -1;
    }

    try {
        const { data, error } = await supabase
            .from('property_listings')
            .update({ status: value.toString() })
            .eq('listing_id', id)
            .select();

        if (error) {
            console.error('Error updating property status:', error);
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Property status updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating property status:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
};
