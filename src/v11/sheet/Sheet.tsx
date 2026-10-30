/** STUB — replaced by the sheet builder. */
export interface SheetProps {
  open: boolean
  page: number                       // 0..2
  onPage: (p: number) => void
  onClose: () => void
  onEnjoy: (eventId: string) => void // opens E1 (/match/enjoy)
  onHighlightMovement: () => void    // page 3 bar tap -> highlight 15:05-15:10 on the graph
}
export default function Sheet(_: SheetProps) { return null }
