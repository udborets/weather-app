type DaySelectButtonProps = {
  onClick: (attr?: any) => any;
  isSelected: boolean;
  text: string;
  date: string;
}

const DaySelectButton = ({ text, date, onClick, isSelected }: DaySelectButtonProps) => {
  return (
    <li className="daySelectButton h-fit w-fit">
      <button
        onClick={onClick}
        className={`daySelectButton__button h-fit w-fit py-1 px-6 text-black ${isSelected ? "bg-slate-600 rounded-t-xl text-white" : ""}`}
      >
        <div className="daySelectButton__content flex flex-col">
          <span className="daySelectButton__dayText font-bold">
            {text},
          </span>
          <span className="daySelectButton__date">
            {date}
          </span>
        </div>
      </button>
    </li>
  )
}

export default DaySelectButton