import React, { useContext } from 'react'
import LoadContext from '../../context/loadContext/loadContext'

const LoadItem = ({ load }) => {
  const { removeLoad, edit_Load, clearEdit, update_Load } = useContext(LoadContext);
  const { _id, title, payload, dimension, isposted } = load;

  const handleRemove = () => {
    removeLoad(_id)
    clearEdit()
  }
  const onchange = () => {
    update_Load({ ...load, isposted: !isposted })
  }

  return (
    <div>
      <div>
        <div >
          <label className={`${isposted && 'post'}`}>Posted
            <i className={`fas fa-check-square ${isposted && 'post'}`}><input type="checkbox" onChange={onchange} /> </i>
          </label>
        </div>
        <div>
          <button title="Edit Load"><i className="fas fa-edit" onClick={() => edit_Load(load)} ></i></button>
          <button onClick={handleRemove} title="Remove Load"><i className="fas fa-trash-alt remove"></i></button>
        </div>
      </div>
      <div>
        <h2>{title}</h2>
         <span>{dimension}</span>
        <div>
          <p>{payload}</p>
        </div>
      </div>
    </div>
  )
}

export default LoadItem;
