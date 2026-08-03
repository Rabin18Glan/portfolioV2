
import { MouseEventHandler } from 'react';

interface FilledButtonProps{
    title?:string,
    onClick:MouseEventHandler<HTMLButtonElement>,

}
function FilledButton({title,onClick}:FilledButtonProps) {
  return ( <button onClick={onClick} className="inline-flex items-center justify-center h-10 px-4 rounded-lg text-sm font-semibold cursor-pointer bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/20">{title}</button>
  )
}

export default FilledButton