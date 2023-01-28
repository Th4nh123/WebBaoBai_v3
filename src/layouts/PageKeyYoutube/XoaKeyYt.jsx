import React from 'react'
import $ from 'jquery'
import { deleteKeyYt,deleteAllKeyYt  } from '../../component/AjaxPost/KeyYoutube';
import { Const_Libs } from '../../component/Toast';

const XoaKeyYt = (props) => {
  const { handleGetAllKeyYt } = props;
  const deleteKeyYtByCheckBox = async () => {
    let arr = []
    for (let checkbox of document.querySelectorAll('input[name="checkbox-key-youtube"]')) {
      if (checkbox.checked) {
        arr.push({ id_key_gg: checkbox.getAttribute('data-id-key-youtube') })
      }
    }

    await deleteKeyYt().then(response => {
      $('#checkbox-all-key-yt').prop('checked', false)
      $('input[name="checkbox-key-youtube"]').prop('checked', false)
      handleGetAllKeyYt();
      if (response.success) {
        Const_Libs.TOAST.success(response.message)
      }
      else {
        Const_Libs.TOAST.error(response.message)
      }
    })
  }

  const deleteAllKeyYtByCheckBox = async () => {
    await deleteAllKeyYt().then(response => {
      $('#check-all-key-yt').prop('checked', false);
      $('input[name="checkbox-key-google"]').prop('checked', false)
      $('.btn-delete-key-yt').removeClass('d-none')
      $('.btn-delete-all-key-yt').addClass('d-none')
      handleGetAllKeyYt();
      if (response.success === true) {
        Const_Libs.TOAST.success(response.message)
      }
      else {
        Const_Libs.TOAST.error(response.message)
      }
    })
    // .catch(err => console.log(err))
  }
  return (
    <>
      <button
        type='button'
        className='btn-delete-key-yt fw-bolder btn btn-outline-danger'
        style={{ fontSize: '14px' }}
        onClick={() => deleteKeyYtByCheckBox()}
      >
        Xóa
      </button>
      <button
        type='button'
        className='btn-delete-all-key-yt fw-bolder btn btn-outline-danger d-none'
        style={{ fontSize: '14px' }}
        onClick={() => deleteAllKeyYtByCheckBox()}
      >
        Xóa hết
      </button>
    </>
  )
}

export default XoaKeyYt