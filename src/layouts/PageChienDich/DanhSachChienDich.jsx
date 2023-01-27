import React, { useEffect } from 'react'

import $ from 'jquery'

import { useSelector } from "react-redux";

const DanhSachChienDich = () => {

  const dataCam = useSelector(state => state.base.data_cam);

  useEffect(() => {
    $('#check-all-cam').click(function () {
      if ($(this).prop('checked')) {
        $('.btn-delete-all-cam').removeClass('d-none')
        $('.btn-delete-cam').addClass('d-none')

        $('input[name="checkbox-cam"]').prop('checked', true)
      } else {
        $('.btn-delete-all-cam').addClass('d-none')
        $('.btn-delete-cam').removeClass('d-none')

        $('input[name="checkbox-cam"]').prop('checked', false)
      }
    })
  },)
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
              id='check-all-cam'
              name='check-all-cam'
            />
          </th>
          <th />
          <th>Tên chiến dịch</th>
          <th>Trạng thái</th>
          <th>Ngôn ngữ</th>
        </tr>
      </thead>
      <tbody>

        {dataCam.length === 1 ? <tr><td>Không có chiến dịch nào</td></tr> :
          (dataCam.map((item, index) => {
            return (
              item._id !== -1 ? <tr key={index}>
                <td style={{ maxHeight: '21px', width: '5%' }}>
                  <input
                    type='checkbox'
                    name='checkbox-cam'
                    data-id-cam={item._id}
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
                  className='text-primary'
                  style={{
                    maxHeight: '21px',
                    width: '30%',
                    maxWidth: '300px'
                  }}
                >
                  {item.campaign}
                </td>
                <td style={{ maxHeight: '21px', width: '20%' }}>
                  {item.check ? <span style={{ color: '#2eb62e' }}>Đang cào</span> : <span style={{ color: 'red' }}>Đã dừng</span>}
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
                    item.language
                  }
                </td>
              </tr> : ''
            )
          }))
        }

      </tbody>
    </table>
  )
}

export default DanhSachChienDich