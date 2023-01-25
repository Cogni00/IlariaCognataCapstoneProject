export interface AuthResponse {
  accessToken: string,
  user: {
      email: string,
      nome: string,
      id: number,
      avatar: []
  }
}

export interface User {
  email: string,
  password: string,
  nome: string,
  cognome: string,
  id: number,
  citta: string,
  impiego: string,
  avatar: string,
  selectedSkills: string[],
  recezioneMess: boolean,
  pending: boolean
}

export interface RegisterRequest {
  email: string,
  password: string,
  nome: string,
  cognome:string,
  impiego: string,
  citta: string,
  avatar: string,
  selectedSkills: string[],
  recezioneMess:boolean
}

export interface LoginRequest {
  email: string,
  password: string
}
