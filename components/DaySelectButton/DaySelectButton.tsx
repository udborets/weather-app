type DaySelectButtonProps = {
  children: string | string[];
  onClick: (attr?: any) => any;
  isSelected: boolean;
}

const DaySelectButton = ({ children: text, onClick, isSelected }: DaySelectButtonProps) => {
  return (
    <li className="daySelectButton h-fit w-fit">
      <button
        onClick={onClick}
        className={`daySelectButton__button h-fit w-fit py-1 px-2 text-black ${isSelected ? "bg-slate-600 rounded-t-xl text-white" : ""}`}
      >
        {text}
      </button>
    </li>
  )
}

export default DaySelectButton