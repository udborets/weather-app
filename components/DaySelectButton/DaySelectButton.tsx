type DaySelectButtonProps = {
  onClick: (attr?: any) => any;
  isSelected: boolean;
  text?: string;
  date: string;
}

const DaySelectButton = ({ text, date, onClick, isSelected }: DaySelectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`daySelectButton__button h-fit w-fit text-[1.2rem] py-1 px-2 md::px-3 rounded-[8px] 
      hover:bg-[var(--sky-color)] hover:text-white
      duration-300 transition-all
      ${isSelected ? "bg-[var(--sky-color)] text-white hover:opacity-100" : "hover:opacity-70"}`}
    >
      <div className="daySelectButton__content flex flex-col">
        <span className="daySelectButton__date font-bol whitespace-nowrap">
          {date}
        </span>
      </div>
    </button>
  )
}

export default DaySelectButton