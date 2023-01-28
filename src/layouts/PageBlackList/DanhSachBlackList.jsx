import React from 'react'
import { useSelector } from 'react-redux';


export default function DanhSachBlackList() {
  const dataBlackList = useSelector(state => state.base.data_black_list)

  return (
    <table className='table '>
      <thead>
        <tr>
          <th scope='col' style={{ textAlign: 'center' }}>
            <input
              className='form-check-input'
              type='checkbox'
              name='checkbox-all-black'
              id='checkbox-all-black'
            />
          </th>
          <th />
          <th scope='col' style={{ width: '150px', backgroundColor: 'beige' }}>Domain</th>
          <th scope='col' style={{ width: '150px', backgroundColor: 'beige' }}>Loại</th>
        </tr>
      </thead>
      <tbody>
        {dataBlackList.length === 0 ? <tr><td>BlackList đang trống</td></tr> : ''}
        {dataBlackList.map((item, index) => {
          return (
            <tr key={index}>
              <td style={{
                maxHeight: '21px',
                width: '5%',
                textAlign: 'center'
              }}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  name="checkbox-black-key"
                  data-id-black-key={item._id}
                />
              </td>
              <td style={{ width: '5%', textAlign: 'center', fontWeight: 'bolder' }}>{index + 1}</td>
              <td style={{ width: '45%' }}>{item.domain}</td>
              <td style={{ width: '45%' }}>{item.loai}</td>
            </tr>
          )
        })
        }
      </tbody>
    </table>
  )
}