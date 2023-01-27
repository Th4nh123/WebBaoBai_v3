import React from 'react'
import $ from 'jquery'
import { ajaxCallPost, ajaxCallPostNoR } from '../../component/AjaxPost';
import { Const_Libs } from '../../component/Toast';

const XoaKeyGg = (props) => {

  const { handleGetAllKeyGg } = props;

  let arr = []
  const deleteKeyGgByCheckBox = async () => {
    for (let checkbox of document.querySelectorAll('input[name="checkbox-key-google"]')) {
      if (checkbox.checked) {
        arr.push({ id_key_gg: checkbox.getAttribute('data-id-key-google') })
      }
    }
    await ajaxCallPost('delete-key-google', arr).then(response => {
      $('#checkbox-all-key-gg').prop('checked', false)
      $('input[name="checkbox-key-google"]').prop('checked', false)
      handleGetAllKeyGg();
      if (response.success) {
        Const_Libs.TOAST.success(response.message)
      }
      else {
        Const_Libs.TOAST.error(response.message)
      }
    })
    // .catch(err => console.log(err))  
  }

  const deleteAllKeyGgByCheckBox = () => {
    ajaxCallPostNoR(`delete-all-key-google`).then(response => {
      $('#check-all-key-gg').prop('checked', false);
      $('input[name="checkbox-key-google"]').prop('checked', false)
      $('.btn-delete-key-gg').removeClass('d-none')
      $('.btn-delete-all-key-gg').addClass('d-none')
      handleGetAllKeyGg();
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
        className='btn-delete-key-gg fw-bolder btn btn-outline-danger'
        style={{ fontSize: '14px' }}
        onClick={() => deleteKeyGgByCheckBox()}
      >
        Xóa
      </button>

      <button
        type='button'
        className='btn-delete-all-key-gg fw-bolder btn btn-outline-danger d-none'
        style={{ fontSize: '14px' }}
        onClick={() => deleteAllKeyGgByCheckBox()}
      >
        Xóa hết
      </button>
    </>
  )
}

export default XoaKeyGg