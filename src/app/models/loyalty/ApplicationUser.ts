import { AccompiendGuest } from './AccompiendGuest'
import { Group } from './Group'

export class ApplicationUser {
  public id: string
  public code
  public name: string
  public email: String
  public mobile: String
  public logoUrl: String

  public group: Group
  public deleted: boolean
  public expire: boolean
  public suspended: boolean
  public generic: boolean
  public wallet

  public points
  public accompaniedGuests: AccompiendGuest[]

  public creationDate: string
  public lastUpdate: string
  public expiryDate: string
  public birthDate: string
  
  public constructor() {}
}
