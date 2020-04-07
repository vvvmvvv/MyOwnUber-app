import React, { useContext, useState, useEffect } from 'react'
import LoadContext from '../../context/loadContext/loadContext'

const LoadForm = () => {
  const context = useContext(LoadContext)
  const { addLoad, editLoad, clearEdit, update_Load } = context

  useEffect(() => {
    if (editLoad !== null) {
      setLoad(editLoad)
    } else {
      setLoad({
        title: '',
        payload: '',
        dimensions: {
          width: '',
          length: '',
          height: ''
        },
        status: 'NEW'
      })
    }
  }, [editLoad, context])

  const [load, setLoad] = useState({
    title: '',
    payload: '',
    dimensions: {
      width: '',
      length: '',
      height: ''
    },
    status: 'NEW'
  })

  const onchange = (e) => {
    setLoad({
      ...load,
      [e.target.name]: e.target.value
    })
  }

  const ondimensionschange = (e) => {
    const dimensions = {
      ...load.dimensions,
      [e.target.name]: e.target.value
    }
    setLoad({
      ...load,
      dimensions
    })
  }

  const onsubmit = (e) => {
    e.preventDefault();
    if (editLoad === null) {
      addLoad(load);

    } else {
      update_Load(load);
      clearEdit();
    }
    setLoad({
      name: '',
      payload: '',
      dimensions: {
        width: '',
        length: '',
        height: ''
      },
      status: 'NEW'
    });
  }
  return (

    <div className="">
      <h1>{editLoad !== null ? 'Edit Load' : 'Create Load'}</h1>
      <form onSubmit={onsubmit} >
        <input type="text" placeholder="Title" name="name" value={load.name} onChange={onchange} required /><br/><br/>
        <input type="text" placeholder="Payload" name="payload" value={load.payload} onChange={onchange} required /><br/>
        <br/>
        <h3>Load Dimension:</h3>
        <input type="text" placeholder="Width" name="width" value={load.dimensions.width} onChange={ondimensionschange} required />&nbsp;
        <input type="text" placeholder="Length" name="length" value={load.dimensions.length} onChange={ondimensionschange} required />&nbsp;
        <input type="text" placeholder="Height" name="height" value={load.dimensions.height} onChange={ondimensionschange} required /><br/>
        <br/>
        <button type="submit" className="btn btn-success" >{editLoad !== null ? 'Update Load' : 'Add Load'}</button>
        {editLoad !== null ? < input onClick={clearEdit} type="button" className="btn clear" value="Cancel" /> : null}
      </form>

    </div>
  )
}

export default LoadForm;



