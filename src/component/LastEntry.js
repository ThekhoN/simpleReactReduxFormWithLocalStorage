import React from 'react'

const LastEntry = ({data}) => (<div className='lastEntry'>
    <div className='lastEntryContainer'>
      <h2>Last Entry:</h2>
      <br/>
      <br/>
    <p>
      <label htmlFor='name'>Name:</label>
      <span id='name'>{data.userName}</span>
    </p>
    <p>
      <label htmlFor='email'>Email:</label>
      <span id='email'>{data.userEmail}</span>
    </p>
    <p>
      <label htmlFor='mobile'>Mobile:</label>
      <span id='mobile'>{data.userMobile}</span>
    </p>
    <p>
      <label htmlFor='time'>Time:</label>
      <span id='time'>{data.userTime}</span>
    </p>
      </div></div>)

export default LastEntry
