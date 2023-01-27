import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import ChonChienDich from '../../layouts/PageCaoBai/ChonChienDich'

import ChonNgonNgu from '../../layouts/PageCaoBai/ChonNgonNgu'

import routes from '../../route'

export default function Header() {

  const dispatch = useDispatch();
  const [tab, setTab] = useState();

  const header = routes.map((value, index) => {
    if (index == 0) {
      return (
        <li key={index} className='nav-item ms-4' role='presentation'>
          <button
            className='nav-link active'
            id={`pills-${value.key}-tab`}
            data-bs-toggle='pill'
            data-bs-target={`#pills-${value.key}`}
            type='button'
            role='tab'
            aria-controls={`pills-${value.key}`}
            aria-selected='true'
            onClick={() => setTab(`${value.tab}`)}
          >
            {value.name}
          </button>
        </li>
      );
    }
    else {
      return (
        <li key={index} className='nav-item' role='presentation'>
          <button
            className='nav-link'
            id={`pills-${value.key}-tab`}
            data-bs-toggle='pill'
            data-bs-target={`#pills-${value.key}`}
            type='button'
            role='tab'
            aria-controls={`pills-${value.key}`}
            aria-selected='false'
            onClick={() => setTab(`${value.tab}`)}
          >
            {value.name}
          </button>
        </li>
      );
    }
  })

  return (
    <div
      className='d-flex justify-content-between align-items-center'
      style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }}
    >
      <ul
        className='col-6 nav-pills mt-2 mb-2 nav nav-content'
        id='tabs'
        role='tablist'
      >
        {/* <li className='nav-item'>
          <a href='#' className='logo-header'>
            <img src='' alt='logo' />
          </a>
          </li> */}

        {header}

      </ul>
      <div className='col-6 d-flex flex-row'>
        <div className='col-6 px-1 d-flex align-items-center justify-content-between name-campaign'>
          <label className='col-4 text-start fs-7 fw-bolder'>
            Tên chiến dịch:{' '}
          </label>
          {/* <input
              type='text'
              className='col-8'
              placeholder='Cào bài cho RDONE'
            /> */}
          <ChonChienDich />

        </div>
        <div
          className='col-6 name-domain d-flex align-items-center'
          style={{ marginLeft: '16px' }}
        >
          <label className='col-4 text-start fs-7 fw-bolder'>
            Ngôn ngữ:{' '}
          </label>
          <ChonNgonNgu />
        </div>
      </div>

    </div>
  );
}
