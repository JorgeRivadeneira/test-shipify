import React from 'react'
import loadingImg from './assets/spinner2.gif'

const Loading = () => {
  return (
    <>
        <center>
            <div>
                <img 
                src={loadingImg}
                width={180}
                alt='Loading'
                className='text-center mx-auto'
                />
            </div>            
        </center>
    </>
  )
}

export default Loading