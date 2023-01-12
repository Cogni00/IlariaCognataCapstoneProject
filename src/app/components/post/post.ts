export interface Post {
  id: number,
  user_id: number,
  testo: string,
  commenti: object[],
  date: {},
  avatar: string,
}

export interface GetPost {
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
/*   html_5: string,
  css:string,
  bootstrap:string,
  javascript:string,
  nodejs:string,
  typescript:string,
  angular:string,
  react:string,
  java:string,
  php:string,
  cplusplus:string,
  mysql:string */
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
  id:number

}


