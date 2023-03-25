interface ICitySearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}


const CitySearchBar = ({ search, setSearch }: ICitySearchBarProps) => {
  return (
    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className='w-[300px] border-2 text-[1rem] px-2 py-1' />
  )
}

export default CitySearchBar