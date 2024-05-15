export enum Role {
  ADMIN = 'admin',
  PARTNER = 'patner',
}

export type Token = {
  userId: string
  userRole: Role
}
