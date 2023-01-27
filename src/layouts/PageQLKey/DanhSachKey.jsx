import React, { useEffect } from 'react'
import $ from 'jquery'
import { useSelector } from 'react-redux'



const DanhSachKey = () => {

  const dataKey = useSelector(state => state.base.data_key)

  useEffect(() => {
    $('#check-all-key').click(function () {
      if ($(this).prop('checked')) {
        $('.btn-delete-all-key').removeClass('d-none');
        $('.btn-delete-key').addClass('d-none');

        $('input[name="checkbox-key"').prop('checked', true)
      } else {
        $('.btn-delete-all-key').addClass('d-none');
        $('.btn-delete-key').removeClass('d-none');

        $('input[name="checkbox-key"').prop('checked', false)
      }
    })

  })

  return (
    <table className='table '>
      <thead>
        <tr>
          <th scope='col'>
            <input
              className='form-check-input'
              type='checkbox'
              name='checkbox-all-key'
              id='check-all-key'
            />
          </th>
          <th />
          <th
            scope='col'
            style={{ width: '150px', backgroundColor: 'beige' }}
          >
            Tiền tố
          </th>
          <th
            scope='col'
            style={{ width: '300px', backgroundColor: 'beige' }}
          >
            Key cha
          </th>
          <th
            scope='col'
            style={{ width: '180px', backgroundColor: 'beige' }}
          >
            hậu tố
          </th>
          <th
            scope='col'
            style={{ width: '180px', backgroundColor: 'beige' }}
          >
            Kiểu
          </th>
          <th
            scope='col'
            style={{ width: '180px', backgroundColor: 'beige' }}
          >
            ID PlayList
          </th>
          <th scope='col'>key cha 1</th>
          <th scope='col'>key cha 2</th>
          <th scope='col'>key cha 3</th>
          <th scope='col'>key cha 4</th>
          <th scope='col'>TopView</th>
          <th scope='col'>TopView</th>
          <th scope='col'>TopView</th>
          <th scope='col'>TopView</th>
          <th scope='col'>TopView</th>
        </tr>
      </thead>
      <tbody>
        {dataKey.length === 0 ? <tr><td>Không tồn tại key</td></tr> : ''}
        {dataKey.map((item, index) => {
          return (
            <tr key={index}>
              <td style={{ maxHeight: '21px', minWidth: '50px' }} >
                <input
                  className='form-check-input'
                  type='checkbox'
                  name='checkbox-key'
                  data-id-key={item._id}
                />
              </td>
              <td style={{ maxHeight: '21px', minWidth: '50px', fontWeight: 'bolder', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.tien_to}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.ten}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.hau_to}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.ky_hieu}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.id_list_vd}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.key_con_1}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.key_con_2}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.key_con_3}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.key_con_4}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.top_view_1}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.top_view_2}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.top_view_3}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.top_view_4}</td>
              <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.top_view_5}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default DanhSachKey