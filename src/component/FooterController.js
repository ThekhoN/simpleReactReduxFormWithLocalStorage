import React from 'react'

const ShowLastEntry = ({onShowLastEntry, text}) => (<span
  className='button'
  onClick={()=>{
      onShowLastEntry()
    }}
  >{text}</span>)

const DeleteFromLocalStorage = ({onDeleteFromLocalStorage}) => (<span
  className='button delete'
  onClick={()=>{
      onDeleteFromLocalStorage()
    }}>DELETE FROM LOCAL STORAGE</span>)

const FooterController = ({showLastEntry, handleDeleteFromLocalStorage, handleShowLastEntry}) => {
  const text = showLastEntry === true ? 'HIDE LAST ENTRY' : 'SHOW LAST ENTRY'
  return (<div className='showLastEntry'>
    <ShowLastEntry
      text={text}
      onShowLastEntry={handleShowLastEntry}/>
    <br/>
    <br/>
    <DeleteFromLocalStorage
      onDeleteFromLocalStorage={handleDeleteFromLocalStorage}/>
  </div>)
}

export default FooterController
