import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadItem from '../loads/LoadItem'
import LoadContext from '../../context/loadContext/loadContext'
import AuthContext from '../../context/authContext/authContext'



const LoadsList = () => {

  const context = useContext(LoadContext)
  const { loading } = useContext(AuthContext)
  const { loads, loadFilter, searchLoad, getLoads } = context;
  useEffect(() => {
    getLoads();
    // eslint-disable-next-line
  }, []);

  if (loads === null || loads.length === 0) {
    return <h3>{loading ? 'Loading loads...' : 'Not created load'}</h3>
  }

  return (
    <div >
      <TransitionGroup className="loads">
        {searchLoad !== null ? searchLoad.map(load => (
          <CSSTransition key={load._id} timeout={300}
            classNames='item' >
            <LoadItem load={load} />
          </CSSTransition>)) :
          loads.filter(load => !loadFilter || load.isposted).map(load => (<CSSTransition key={load._id} timeout={300}
            classNames='item'>
            <LoadItem load={load} />
          </CSSTransition>)
          )}
      </TransitionGroup>
    </div>
  )
}
export default LoadsList;
