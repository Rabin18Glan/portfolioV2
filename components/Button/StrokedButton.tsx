
import { MouseEventHandler } from 'react'
interface StrokedButtonProps{
    title?:string,
    onClick:MouseEventHandler<HTMLButtonElement>,

}
function StrokedButton({title,onClick}: StrokedButtonProps) {
  return (
    <button onClick={onClick} className="inline-flex items-center justify-center h-10 px-4 rounded-lg text-sm font-semibold cursor-pointer bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 shadow-lg shadow-primary-600/10">{title}</button>
  )
}

export default StrokedButton