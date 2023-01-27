import React from 'react'

import $ from 'jquery'

import { useSelector } from 'react-redux';

import { ajaxCallPost, ajaxCallPostNoR } from '../../component/AjaxPost';

import { Const_Libs } from '../../component/Toast';

const XoaBlackList = (props) => {

  const { handleGetBlackListByIdCam } = props;

  const current_id_cam = useSelector(state => state.base.current_id_cam)

  const deleteBlackKeyByCheckBox = async () => {

    let arr = [];
    for (const checkbox of document.querySelectorAll(
      'input[name="checkbox-black-key"]'
    )) {
      if (checkbox.checked) {
        arr.push({ id_black_list: checkbox.getAttribute('data-id-key') })
      }
    }

    await ajaxCallPost('delete-black-list', arr).then(response => {
      $('#checkbox-all-black').prop('checked', false)
      $('input[name="checkbox-black-key"]').prop('checked', false)
      handleGetBlackListByIdCam();
      if (response.success === true) {
        Const_Libs.TOAST.success(response.message)
      }
      else {
        Const_Libs.TOAST.error(response.message)
      }
    })
    // .catch(err => console.log(err))
  }

  const deleteAllBlackKeyByCheckBox = () => {
    ajaxCallPostNoR(`delete-all-black-list/${current_id_cam}`).then(response => {
      $('#checkbox-all-black').prop('checked', false);
      $('input[name="checkbox-black-key"]').prop('checked', false)
      $('.btn-delete-all-bl').addClass('d-none')
      $('.btn-delete-bl').removeClass('d-none')
      handleGetBlackListByIdCam();
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
        type='submit'
        className='btn-delete-bl btn btn-outline-danger fw-bolder'
        style={{ marginRight: '10px', fontSize: '14px' }}
        onClick={deleteBlackKeyByCheckBox}
      >
        Xóa
      </button>

      <button
        type='submit'
        className='btn-delete-all-bl btn btn-outline-danger fw-bolder d-none '
        style={{ marginRight: '10px', fontSize: '14px' }}
        onClick={deleteAllBlackKeyByCheckBox}
      >
        Xóa hết
      </button>

    </>
  )
}

export default XoaBlackList