import {gql} from '@apollo/client'

export const ADDSONG = gql`
mutation addSongs($title: String) {
    addSong(title: $title){
      id,
      title
    }
  }
`

export const DELETESONG = gql`
mutation deleteSong($songId: ID){
  deleteSong(id: $songId){
    id,
    title
  }
}
`

export const ADDLYRICS = gql`
mutation setContent($songId: ID, $content: String){
    addLyricToSong(id: $songId, content: $content){
        id
        lyrics{
            id
            content
        }
    }
  }
` 

export const LIKELYRIC = gql`
mutation likeLyric ($lyricId: ID){
    likeLyric(id: $lyricId){
      id,
      content,
      likes,
      song{
        title
      }
    }
  }
`

export const DELETELYRIC = gql`
mutation deleteLyric ($lyricId: ID){
    deleteLyric(id: $lyricId){
        id,
        content
    }
}
`

