import Part from './Part'
import Vehicle from './Vehicle'

export default interface DataTable extends Part {
  Vehicles: Vehicle[]
  selected: boolean
}
