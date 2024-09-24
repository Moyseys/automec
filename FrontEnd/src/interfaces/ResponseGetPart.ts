import Part from './Part';

export default interface ResponseGetPart {
  total: number,
	totalOfPages: number,
  currentPage: number,
  parts: Part[]
}
