import $, { ajax, data } from 'jquery'
import React, { useEffect } from 'react'
import { OutTable, ExcelRenderer } from 'react-excel-renderer'
import { useDispatch, useSelector } from 'react-redux'
import {
  ajaxCallGet,
  ajaxCallGetUrl,
  ajaxCallPost,
  getHostname
} from '../libs/base'
import { changeDataKey } from '../reducer_action/BaseReducerAction'

import '../../css/style.css'

import { Const_Libs } from '../libs/Const_Libs'
import { useState } from 'react'

export default function PageQLKey() {
  const dispatch = useDispatch()

  const dataKey = useSelector(state => state.base.data_key)
  const dataCam = useSelector(state => state.base.data_cam)
  const data_current_id_cam = useSelector(state => state.base.current_id_cam)
  const [isUploading, setUploading] = useState(false);


  const cutKeyAndUrl = myString => {
    let index = myString.indexOf('-')
    return {
      phan_tu_1: myString.slice(0, index),
      phan_tu_2: myString.slice(index + 1).trim()
    }
  }

  const handleGetKeyByIdCam = (id) => {
    ajaxCallGet('get-key-by-id-cam/' + id).then(rs => {
      console.log(rs);
      dispatch(changeDataKey([...rs]))
    })
  }

  const handleGetAllKey = () => {
    ajaxCallGet('get-key').then(rs => {
      dispatch(changeDataKey([...rs]))
    })
  }


  useEffect(() => {
    if (data_current_id_cam) {
      handleGetKeyByIdCam(data_current_id_cam)
    } else {
      handleGetAllKey();
    }

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

  }, [])

  const fileHandler = event => {
    let fileObj = event.target.files[0]
    setUploading(true);

    ExcelRenderer(fileObj, async (err, resp) => {
      resp.rows.splice(0, 3)
      let data_key = [...resp.rows.filter(item => item.length !== 0)]
      console.log(data_key)
      if (err) {
        setUploading(false);
        console.log(err)
      } else {
        let arr = []
        data_key.map(item => {
          arr.push({
            tien_to: item[2] ? item[2] : '',
            ten: item[3] ? item[3] : '',
            hau_to: item[4] ? item[4] : '',
            key_1: item[5] ? cutKeyAndUrl(item[5]).phan_tu_1 : '',
            url_key_1: item[5] ? cutKeyAndUrl(item[5]).phan_tu_2 : '',
            key_2: item[6] ? cutKeyAndUrl(item[6]).phan_tu_1 : '',
            url_key_2: item[6] ? cutKeyAndUrl(item[6]).phan_tu_2 : '',
            key_3: item[7] ? cutKeyAndUrl(item[7]).phan_tu_1 : '',
            url_key_3: item[7] ? cutKeyAndUrl(item[7]).phan_tu_2 : '',
            key_4: item[8] ? cutKeyAndUrl(item[8]).phan_tu_1 : '',
            url_key_4: item[8] ? cutKeyAndUrl(item[8]).phan_tu_2 : '',
            top_view_1: item[9] ? cutKeyAndUrl(item[9]).phan_tu_1 : '',
            url_top_view_1: item[9] ? cutKeyAndUrl(item[9]).phan_tu_2 : '',
            top_view_2: item[10] ? cutKeyAndUrl(item[10]).phan_tu_1 : '',
            url_top_view_2: item[10] ? cutKeyAndUrl(item[10]).phan_tu_2 : '',
            top_view_3: item[11] ? cutKeyAndUrl(item[11]).phan_tu_1 : '',
            url_top_view_3: item[11] ? cutKeyAndUrl(item[11]).phan_tu_2 : '',
            top_view_4: item[12] ? cutKeyAndUrl(item[12]).phan_tu_1 : '',
            url_top_view_4: item[12] ? cutKeyAndUrl(item[12]).phan_tu_2 : '',
            top_view_5: item[13] ? cutKeyAndUrl(item[13]).phan_tu_1 : '',
            url_top_view_5: item[13] ? cutKeyAndUrl(item[13]).phan_tu_2 : ''
          })
        })
        if (data_current_id_cam) {
          await ajaxCallPost(`save-key-by-id-cam/${data_current_id_cam}`, arr).then(response => {
            Const_Libs.TOAST.success('Thêm key theo chiến dịch thành công')
            handleGetKeyByIdCam(data_current_id_cam)
          })
        } else {
          await ajaxCallPost(`save-key`, arr).then(rs => {
            Const_Libs.TOAST.success('Thêm key thành công')
            handleGetAllKey()
          })
        }
      }
    })
  }

  const deleteKeyByCheckBox = async () => {
    for (const checkbox of document.querySelectorAll(
      'input[name="checkbox-key"]'
    )) {
      console.log(checkbox)
      if (checkbox.checked) {
        await ajaxCallGet(
          'delete-key/' + checkbox.getAttribute('data-id-key')
        ).then(rs => {
          checkbox.checked = false
          console.log(rs)
        })
      }
    }
    if (data_current_id_cam) {
      handleGetKeyByIdCam(data_current_id_cam)
    } else {
      handleGetAllKey()
    }
    $('#check-all-key').prop('checked', false);
    Const_Libs.TOAST.success('Đã xóa thành công.');
  }

  const deleteAllKeyByCheckBox = async () => {
    ajaxCallGet(`delete-all-key/${data_current_id_cam}`).then(rs => {
      $('#check-all-key').prop('checked', false);

      $('.btn-delete-all-key').addClass('d-none');
      $('.btn-delete-key').removeClass('d-none');

      handleGetKeyByIdCam(data_current_id_cam);
      Const_Libs.TOAST.success('Đã xóa thành công.');
    })
  }
  return (
      <div style={{ height: '77vh', width: '100%', margin: 'auto', border: '1px solid #ccc', borderRadius: '5px', padding: '8px', overflow: 'auto' }}>
        <div className='right-container position-relative'>
          <div
            className='row px-4 d-flex align-items-center justify-content-between position-sticky'
            style={{ top: '0', padding: '10px', background: '#fff' }}
          >
            <div className='col-9'>
              <span className='fs-7 fw-bolder'>Danh sách key:  </span>
              <a href='#' className='mr-2'>

              </a>
            </div>
            <div className='col-3 d-flex flex-row justify-content-end'>
              <div className='col-4 delete'>
                <label htmlFor='inputTag' style={{ marginRight: '10px' }}>
                  <span className='btn btn-primary fw-bolder'>Nhập Excel</span>
                  <input
                    id='inputTag'
                    key={isUploading}
                    type='file'
                    onChange={e => fileHandler(e)}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className='col-4 delete'>
                <button
                  type='submit'
                  className='btn-delete-key btn btn-outline-danger fw-bolder'
                  style={{ marginRight: '10px' }}
                  onClick={() => deleteKeyByCheckBox()}
                >
                  Xóa
                </button>

                <button
                  type='submit'
                  className='d-none btn-delete-all-key btn btn-outline-danger fw-bolder'
                  style={{ marginRight: '10px' }}
                  onClick={() => deleteAllKeyByCheckBox()}
                >
                  Xóa hết
                </button>
              </div>
            </div>
          </div>
          <div className='p-3 '>
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
                  <th/>
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
                {dataKey.length === 0 ? <span>Không tồn tại key</span> : ''}
                {dataKey.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td style={{ maxHeight: '21px',minWidth: '50px' }} >
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='checkbox-key'
                          data-id-key={item.id}
                        />
                      </td>
                      <td style={{ maxHeight: '21px', minWidth: '50px', fontWeight: 'bolder', textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.tien_to}</td>
                      <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.ten}</td>
                      <td style={{ maxHeight: '21px', width: '20%', minWidth: '250px' }}>{item.hau_to}</td>
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
          </div>
        </div>
      </div>

  )
}

