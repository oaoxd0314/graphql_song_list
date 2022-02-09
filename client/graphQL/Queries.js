import {gql} from "@apollo/client"

export const GETSONGS = gql`
  query getSongs{
    songs{
        id
        title
        lyrics{
            content
        }
    }
  }
`

export const GETSONG = gql`
query getSong($songId:ID!){
  song(id:$songId){
    title
    lyrics{
      id
      content
      likes
    }
  }
}
`

export const GETLYRICS = gql`
  query getLyrics($lyricId: String!){
    lyric(id: $lyricId){
      likes
      content
      song{
        title
      }
    }
  }
`