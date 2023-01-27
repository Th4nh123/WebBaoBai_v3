import React from 'react'

import $ from 'jquery'

import { ajaxCallPost, ajaxCallPostNoR } from '../../component/AjaxPost';

import { Const_Libs } from '../../component/Toast';

const XoaChienDich = (props) => {

  const { handleGetCampaign } = props;

  let arr = [];
  const deleteCamByCheckBox = async () => {
    for (const checkbox of document.querySelectorAll(
      'input[name="checkbox-cam"]'
    )) {
      if (checkbox.checked) {
        arr.push({ id_cam: checkbox.getAttribute('data-id-cam') })
      }
    }
    await ajaxCallPost('delete-campaign', arr).then(response => {
      $('#checkAllCam').prop('checked', false)
      $('input[name="checkbox-cam"]').prop('checked', false)
      handleGetCampaign();
      if (response.success) {
        Const_Libs.TOAST.success(response.message)
      }
      else {
        Const_Libs.TOAST.error(response.message)
      }
    })
      .catch(err => console.log(err))
    arr = [];
  }

  const deleteAllCamByCheckBox = () => {
    ajaxCallPostNoR('delete-all-campaign').then(response => {
      $('#check-all-cam').prop('checked', false)
      $('input[name="checkbox-cam"]').prop('checked', false)
      $('.btn-delete-all-cam').addClass('d-none')
      $('.btn-delete-cam').removeClass('d-none')
      handleGetCampaign();
      if (response.success) {
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
        className='btn-delete-cam fw-bolder btn btn-outline-danger'
        style={{ fontSize: '14px' }}
        onClick={() => deleteCamByCheckBox()}
      >
        Xóa
      </button>

      <button
        type='button'
        className='btn-delete-all-cam fw-bolder btn btn-outline-danger d-none'
        style={{ fontSize: '14px' }}
        onClick={() => deleteAllCamByCheckBox()}
      >
        Xóa hết
      </button>
    </>
  )
}

export default XoaChienDich