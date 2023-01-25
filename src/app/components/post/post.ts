export interface Post {
  id: number,
  user_id: number,
  testo: string,
  commenti: object[],
  date: {},
  avatar: string,
}

export interface GetPost {
  id:number,
  user_id: number,
  testo: string,
  commenti: object[],
  date: {},
  avatar: string
}

export interface Avatars {
avatar : string
}

export interface Like {
  postId: number,
  userId: number
}

export interface GetSkills {
  id: number,
  userId:number,
  selectedsSkills: string[]
}

export interface Skills {
  selectedSkills: string[]
}

export interface Messaggi {
  senderId: number,
  senderName:string,
  text:string,
  recieverId:number,
  receiverName:string,
  id:number,
  pending: boolean
}


export interface News {
   articles: [
    {
      source: {
        id: null,
        name: string,
      },
      author: string,
      title: string,
      description: string,
      url: string,
      urlToImage: string,
      publishedAt: string,
      content: string,
    }
   ]

    }

    export interface Articles {
      author: string,
      title: string,
      description: string,
      url: string,
      urlToImage: string,
      publishedAt: string,
      content: string
    }


    export interface Notizie {
      data: [
        {
          uuid: string,
          title: string,
          description: string,
          keywords: string,
          snippet: string,
          url: string,
          image_url: string,
          language: string,
          published_at: string,
          source: string,
          categories: [
            string,
          ],
          relevance_score: null
        }
      ]
    }

    export interface Data

    {
      uuid: string,
      title: string,
      description: string,
      keywords: string,
      snippet: string,
      url: string,
      image_url: string,
      language: string,
      published_at: string,
      source: string,
      categories: [
        string,
      ],
      relevance_score: null
    }

