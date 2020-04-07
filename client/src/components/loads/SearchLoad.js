import React, { useRef, useContext } from 'react';
import LoadContext from '../../context/loadContext/loadContext';

const SearchLoad = () => {
  const { search_Load, clearSearchLoad } = useContext(LoadContext);
  const load = useRef('');
  const onchange = e => {
    if (load.current.value !== '') {
      search_Load(e.target.value)
    } else {
      clearSearchLoad()
    }
  }
  return (
    <div>
      <h4>Find load:</h4>
       <form className="form-inline my-2 my-lg-0">
       <i className="fas fa-search search-icon" />&nbsp;<input ref={load} onChange={onchange} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
    </form>
    <hr/>
      {/* <input  type="text" placeholder="Search Load by name..." className="search" />
       */}
    </div>
  )
}
export default SearchLoad;
