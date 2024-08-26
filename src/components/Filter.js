import { DiskSpinner } from "./DiskSpinner"

export const Filter = ({filterText, setFilterText, loading}) => {
   return (
      <div className="filter-text">
         <label htmlFor="filterText">Filter:</label>
         <input type="text" id="filterText" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
         <DiskSpinner loading={loading} />
      </div>
   )
}