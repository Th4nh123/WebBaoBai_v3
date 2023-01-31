import React from 'react'
import $ from 'jquery'
import { useSelector } from 'react-redux'

import { deleteKey, deleteAllKey } from '../../component/AjaxPost/Key'
import { Const_Libs } from '../../component/Toast'

const XoaKey = (props) => {

  const { handleGetKeyByIdCam } = props;
  const data_current_id_cam = useSelector(state => state.base.current_id_cam)

  const deleteKeyByCheckBox = async () => {

    let arr = [];
    for (const checkbox of document.querySelectorAll(
      'input[name="checkbox-key"]'
    )) {
      // console.log(checkbox)
      if (checkbox.checked) {
        arr.push({ id_key_word: checkbox.getAttribute('data-id-key') })
        // .catch(err => console.log(err))
      }
    }

    await deleteKey(arr).then(response => {
      $('#checkbox-all-key').prop('checked', false)
      $('input[name="checkbox-key"]').prop('checked', false)
      handleGetKeyByIdCam(data_current_id_cam);
      if (response.success === true) {
        Const_Libs.TOAST.success(response.message)
      }
      else {
        Const_Libs.TOAST.error(response.message)
      }
    })
  }

  const deleteAllKeyByCheckBox = async () => {
    deleteAllKey(data_current_id_cam).then(response => {
      $('#check-all-key').prop('checked', false);

      $('.btn-delete-all-key').addClass('d-none');
      $('.btn-delete-key').removeClass('d-none');

      handleGetKeyByIdCam(data_current_id_cam);
      if (response.success === true) {
        Const_Libs.TOAST.success(response.message)
      }
      else {
        Const_Libs.TOAST.error(response.message)
      }
    })
  }
  return (
    <>
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
        style={{ marginRight: '10px', fontSize: '14px' }}
        onClick={() => deleteAllKeyByCheckBox()}
      >
        Xóa hết
      </button>
    </>
  )
}

export default XoaKey