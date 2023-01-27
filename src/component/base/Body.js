import React from 'react'

import routes from '../../route'

export default function Body(){

  const body = routes.map((value,index) => {
    if (index == 0) {
      return (
        <div
          key={index}
          className='tab-pane fade show active'
          id={`pills-${value.key}`}
          role='tabpanel'
          aria-labelledby={`pills-${value.key}-tab`}
        >
          {value.component}
        </div>
      );
    }
    else{
      return (
        <div
          key={index}
          className='tab-pane fade'
          id={`pills-${value.key}`}
          role='tabpanel'
          aria-labelledby={`pills-${value.key}-tab`}
        >
          {value.component}
        </div>
      );
    }
  })

  return (
    <div className='tab-content' id='pills-tabContent'>
      <div
        className='container-fluid text-center fs-5 text-danger'
        id='main-error'
      >
      </div>
      {body}
    </div>
  );
}
