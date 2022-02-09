import React, { useEffect, useState } from 'react';
import {useParams,Link} from 'react-router-dom'
import {useMutation, useQuery} from '@apollo/client' 
import { GETSONG } from '../graphQL/Queries';
import { ADDLYRICS,DELETELYRIC,LIKELYRIC } from "../graphQL/Mutations";

export default function SongDetail() {
        let { id } = useParams();
        const [lyric,setLyric] = useState('')

        const {error , loading, data , refetch} = useQuery(GETSONG,{
            variables: { songId:id },
            enabled:false
        });

        const [addNewLyric, {loading: add_loading, error: add_error }] = useMutation(ADDLYRICS,{
            onCompleted : (res) => mutationCallBack 
        })
        const [deleteLyric,{loading: delete_loading, error: delete_error }] = useMutation(DELETELYRIC,{
            onCompleted: (res) => mutationCallBack 
        })
        const [likeLyric,{loading: like_loading, error: like_error }] = useMutation(LIKELYRIC,{
            onCompleted: (res) => mutationCallBack 
        })

        const onSubmit = () =>{
            addNewLyric({ variables: {songId: id, content: lyric}})
        }

        const onLyricChange = (event) =>{
            setLyric(event.target.value)
        }

        const onIconClick = (item,type) =>{
            if(type === 'like') likeLyric({variables:{lyricId: item.id}})
            if(type === 'delete') deleteLyric({variables:{lyricId: item.id}})
       }

       const mutationCallBack = (res) =>{
            setLyric('')
            refetch()
       }

       useEffect(()=>{
            refetch()
        },[])

        if (loading | add_loading | delete_loading | like_loading) return <div> loading... </div>;

        if (error | add_error | delete_error | like_error) return (
            <div>
                <Link to='/'> Back </Link>
                <h3>Error happen</h3>
                <div> something bad happen plz try again.</div>
            </div>
        );

    return (
        <div>
            <Link to='/'> Back </Link>
            <h3>{data.song.title}</h3>

            <ul className='collection'>
                {data && data.song.lyrics.length > 0 
                    ? data.song.lyrics.map((item,index)=>(
                        <li className='collection-item' key={index}>
                            <div>{item.content}</div>
                            <div className="functional">

                                <div className="functional-item">
                                    <i className="material-icons icon icon-sm vertical-center" onClick={(event)=>onIconClick(item,'delete')} >delete </i>
                                    <span className="icon-desc">delete this lyrics</span>
                                </div>
                                
                                <div className="vote-box functional-item">
                                    <i className="material-icons icon icon-sm vertical-center" onClick={(event)=>onIconClick(item,'like')} >thumb_up</i>
                                    <span className="icon-desc">like this lyrics</span>
                                    <span>{item.likes}</span>
                                </div>

                            </div>
                        </li>
                    ))
                    : <li className='collection-item'> not have any lyrics, Add new one? </li>
                }
            </ul>
            
            <form onSubmit={onSubmit}>
                <label>Create new lyric</label>
                <input type="text" value={lyric} onChange={onLyricChange}></input>
            </form>

        </div>
    );
}
