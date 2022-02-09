import React, { useState } from 'react';
import {useMutation} from '@apollo/client'
import { ADDSONG } from '../graphQL/Mutations';
import { Link,useHistory } from 'react-router-dom';

export default function SongCreate() {
  const [createSong, { data, loading, error }] = useMutation(ADDSONG);
  const history = useHistory();
  const [title,setTilte] = useState('')


  const onTitleChange = (event) =>{
    setTilte(event.target.value)
  }

  const onSubmit = (event) =>{
    event.preventDefault();

    if(title === ''){
      return ;
    }
    
    createSong({ variables: { title: title }}).then(res=>{
      history.push('/')
    })
    setTilte('')
  }

  if(error) return <div> Error Happen</div>
  if(loading) return <div> Loading </div>

  return (
    <div>
        <Link to='/'> Back </Link>
        <h3>Create a new song</h3>
        <form onSubmit={onSubmit}>
            <label>Song Title:</label>
            <input type='text' value={title} onChange={onTitleChange} />

        </form>
    </div>
)}
