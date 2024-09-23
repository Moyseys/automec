import Vehicle from './Vehicle';

export default interface Part{
  id?: number
  partNumber: String,
  brand: String,
  model: String,
  Vehicles?: Vehicle[]
  createdAt?: Date | String,
  updatedAt?: Date | String
}
