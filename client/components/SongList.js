import React,{useEffect, useState} from 'react';
import {useQuery,useMutation} from '@apollo/client' 
import {GETSONGS} from "../graphQL/Queries"
import {DELETESONG} from "../graphQL/Mutations"
import { Link ,useHistory} from 'react-router-dom';


export default function SongList() {
    const {error,loading,data,refetch,isRefetching,isRefetchError} = useQuery(GETSONGS,{enabled:false});
    const history = useHistory();
    const [deleteSong] = useMutation(DELETESONG);

    const [songs,setSong] = useState([]);

    useEffect(()=>{
        if(data){
            setSong(data.songs)
        }
    },[data])

    useEffect(()=>{
        refetch()
    },[])

    const onDeleteClick = (song,event) => {
        event.stopPropagation()

        deleteSong({ variables: { songId: song.id }}).then(res=>{
            refetch()
        })
    }

    const onSongClick = (song) =>{
        let id = song.id
        history.push(`/songs/${id}`)
    }

    if (loading | isRefetching) return 'Loading...';
    if (error | isRefetchError) return `Error! ${error.message}`;

    return (
        <div>
            <h3>歌曲列表</h3>
            <div className='collection'>
                {songs.length > 0
                    ? songs.map((song,index)=>(
                        <div onClick={()=>{onSongClick(song)}} className='collection-item' key={index}>
                            <div>{song.title}</div>
                            <i className="material-icons icon-sm vertical-center" onClick={(event)=>onDeleteClick(song,event)} >delete</i>
                        </div>
                    ))
                    : null
                }
            </div>
            <Link className='btn-floating btn-large red right' to={'/songs/new'} > 
                <i className="material-icons margin-none">
                    add
                </i>
            </Link>
        </div>
    )
}