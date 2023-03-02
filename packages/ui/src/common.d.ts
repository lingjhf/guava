interface Position {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

interface SizePosition extends Position, Size {}
