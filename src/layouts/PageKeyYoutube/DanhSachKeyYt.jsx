import React, { useEffect } from 'react'

import $ from 'jquery'

import { useSelector } from 'react-redux';

const DanhSachKeyYt = () => {
  const dataKeyYoutube = useSelector(state => state.base.data_key_youtube)

  useEffect(() => {
    $('#check-all-key-yt').click(function () {
      if ($(this).prop('checked')) {
        $('.btn-delete-all-key-yt').removeClass('d-none')
        $('.btn-delete-key-yt').addClass('d-none')

        $('input[name="checkbox-key-youtube"]').prop('checked', true);
      } else {
        $('.btn-delete-all-key-yt').addClass('d-none')
        $('.btn-delete-key-yt').removeClass('d-none')

        $('input[name="checkbox-key-youtube"]').prop('checked', false);
      }
    })

  })

  return (
    <table className='table '>
      <colgroup>
        <col style={{ width: '5%!important' }}></col>
        <col style={{ width: '5%!important' }}></col>
        <col style={{ width: '40%!important' }}></col>
        <col style={{ width: '40%!important' }}></col>
        <col style={{ width: '10%!important' }}></col>
        <col style={{ width: '10%!important' }}></col>
      </colgroup>
      <thead>
        <tr>
          <th>
            <input 
              className='form-check-input'
              type='checkbox' 
              id='check-all-key-yt' 
              name='check-all-key-yt'
            />
          </th>
          <th style={{ textAlign: 'center', backgroundColor: 'beige' }}>STT</th>
          <th style={{ backgroundColor: 'beige' }}>Key Youtube</th>
          <th style={{ textAlign: 'center', backgroundColor: 'beige' }}>Count</th>
          {/* <th>Tổng số Key</th> */}
        </tr>
      </thead>
      <tbody>
        {dataKeyYoutube.length === 0 ? <tr><td>Không có Key nào</td></tr> :
          (dataKeyYoutube.map((item, index) => {
            let class_item = `youtube-item-${item._id}`;
            return (
              <tr key={index} className={class_item}>
                <td style={{ maxHeight: '21px', width: '5%' }}>
                  <input
                    type='checkbox'
                    name='checkbox-key-youtube'
                    data-id-key-youtube={item._id}
                  />
                </td>
                <td
                  style={{
                    maxHeight: '21px',
                    width: '5%',
                    textAlign: 'center'
                  }}
                  className='fw-bolder'
                >
                  {index + 1}
                </td>
                <td
                  className=''
                  style={{
                    maxHeight: '21px',
                    width: '30%',
                    maxWidth: '300px'
                  }}
                >
                  {item.key_api}
                </td>
                <td
                  style={{
                    maxHeight: '21px',
                    width: '10%',
                    textAlign: 'center',
                    fontSize: '14px'
                  }}
                >
                  {
                    item.count
                  }
                </td>
              </tr>
            )
          }))
        }

      </tbody>
    </table>
  )
}

export default DanhSachKeyYt