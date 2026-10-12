export interface Clinic {
  id: string,
  name: string,
  distance: number
}

export interface Place{
  id: string,
  name: string,
}

export interface Analysis {
  id: string;
  name: string;
  code: string;
  price: number;
  discounted: number;
}

export interface AnalysisCategory{
  id: string,
  name: string
}
