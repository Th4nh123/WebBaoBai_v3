import React, { useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import { useDispatch, useSelector } from 'react-redux';

import { ajaxCallGet } from '../../component/AjaxGet';
import { ajaxCallPost } from '../../component/AjaxPost';
import { Const_Libs } from '../../component/Toast';
import { changeDataBlackList } from '../../component/reducer_action/BaseReducerAction';



const NhapExcel = () => {
  const dispatch = useDispatch();
  const current_id_cam = useSelector(state => state.base.current_id_cam)

  const [isUploading, setUploading] = useState(false);


  const handleGetBlackListByIdCam = () => {
    ajaxCallGet(`get-black-list-by-id-cam/${current_id_cam}`).then(rs => {
      dispatch(changeDataBlackList([...rs]))
    }).catch(err => console.log(err))
  }

  const fileHandler = event => {
    
    let fileObj = event.target.files[0]
    setUploading(true);

    ExcelRenderer(fileObj, (err, resp) => {
      // resp.rows.splice(0, 3)
      // let data_key = [...resp.rows.filter(item => item.length !== 0)]
      if (err) {
        setUploading(false);
      } else {
        let arr = [];
        resp.rows.map(item => {
          arr.push({
            domain: item[0],
            loai: item[1]
          })
        })
        if (current_id_cam) {
          ajaxCallPost(`save-black-list-by-id-cam/${current_id_cam}`, arr).then(response => {
            handleGetBlackListByIdCam();
            if (response.success === true) {
              Const_Libs.TOAST.success(response.message)
            }
            else {
              Const_Libs.TOAST.error(response.message)
            }
          })
        } else {
          Const_Libs.TOAST.error('Vui lòng chọn chiến dịch trước khi import.')
        }
      }
    })
  }

  return (
    <label style={{ marginRight: '10px' }}>
      <span className='btn btn-primary fw-bolder' style={{ fontSize: '14px' }}>
        Nhập Excel
      </span>
      <input
        id='inputList'
        key={isUploading}
        type='file'
        onChange={e => fileHandler(e)}
        style={{ display: 'none' }}
      />
    </label>
  )
}

export default NhapExcel