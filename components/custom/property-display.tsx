import React from 'react'
import { Button } from '../ui/button';

type PropertyDisplayProps = {
    imageSrc: string;
    location: string;
    rentAmount: string;
    area: string;
    bhk: string;
    bathroom: string;
    address: string;
    locality: string;
}

export default function PropertyDisplay({
    imageSrc,
    location,
    rentAmount,
    area,
    bhk,
    bathroom,
    address,
    locality,

}: PropertyDisplayProps) {
    return (
        <div className='ml-[10px]'>
            <div className='flex'>
            <img src={imageSrc} alt="not avail" className='h-[500px] w-[700px]' />
            <div className='flex-col ml-[20px] text-muted-foreground'>
                <div className='my-2'>Address:</div>
                <div className='my-2'>{address}</div>
                <div className='my-2'>Locality:</div>
                <div className='my-2'>{locality}</div>
                <div className='my-2'>Location:</div>
                <div className='my-2'>{location}</div>
                <div className='my-2'>Area in sqft:</div>
                <div className='my-2'>{area}</div>
                <div className='my-2'>BHK:</div>
                <div className='my-2'>{bhk}</div>
                <div className='my-2'>Bathroom:</div>
                <div className='my-2'>{bathroom}</div>
                <div className='my-2'>Rent:</div>
                <div className='my-2'>{rentAmount}</div>
            </div>
            </div>
            <Button className='my-2'>Predict Price</Button>
        </div>
    )
}


