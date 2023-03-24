export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface SizePosition extends Position, Size {}

export interface Tree {
  children?: Tree[]
}
