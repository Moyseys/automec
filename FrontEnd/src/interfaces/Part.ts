import Vehicle from './Vehicle';

export default interface Part{
  id?: String
  partNumber: String,
  brand: String,
  model: String,
  Vehicles?: Vehicle[]
  createdAt?: Date,
  updatedAt?: Date
}
