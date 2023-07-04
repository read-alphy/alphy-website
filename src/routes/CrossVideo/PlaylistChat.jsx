import React from 'react';
import {useState} from 'react';

export default function PlaylistChat({data,setData}) {

    const title = data.name
    const description = data.description
    const tracks = data.tracks
    const playlistUserID = data.userID


    return(
        <div className="grid lg:grid-cols-6 w-full">
            <div className="col-span-1 mt-20">
            <p className="text-xl text-zinc-700 dark:text-zinc-300">{data.name}</p>
            <p className="text-md text-zinc-400 dark:text-zinc-500">{data.description}</p>
            </div>
            </div>
    )

}