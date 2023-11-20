// pages/api/update-property-status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

export const POST = async (req: NextApiRequest) => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    const { id, action } = req.query;
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' },{status:405});
        // return res.status(405).json({ message: 'Method Not Allowed' });
    }

    console.log(id + " " + action);
    let value = 0;
    if (action == "approve") value = 1;
    else value = -1;

    try {
        // Perform the necessary logic to update the property status in your database
        // Replace `yourDatabaseUpdateFunction` with the actual function you use to update the database

        const { data, error } = await supabase
            .from('property_listings')
            .update({ status: value.toString() })
            .eq('listing_id', id)
            .select();
       return NextResponse.json({ message: 'Property status updated successfully' },{status:200});
       // return res.status(200).json({ message: 'Property status updated successfully' });
    } catch (error) {
        console.error('Error updating property status:', error);
       return NextResponse.json({message: 'Internal Server Error' },{status:500})
       // return res.status(500).json({ message: 'Internal Server Error' });
    }
};
