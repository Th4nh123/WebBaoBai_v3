import React from 'react'

import { useSelector } from 'react-redux';

import $ from 'jquery'

import { useState } from 'react';

import { SaveKeyGoogle } from '../AjaxPost/KeyGoogle';

import { Const_Libs } from '../Toast';

const ModalAddKeyGoogle = (props) => {

    const [keyGoogle, setKeyGoogle] = useState({
        key_api: '',
        description: ''
    })

    const { handleGetAllKeyGg } = props;

    const data_key_google = useSelector(state => state.base.data_key_google)

    const handleSubmit = () => {
        if (data_key_google.length > 0) {
            if ($(`.google-item-${data_key_google[0]._id}`).css("background-color") != "rgba(0, 0, 0, 0)") {
                Const_Libs.TOAST.error("Hãy dừng test key trước khi thực hiện thao tác")
                return;
            }
        }
        let data = [{
            key_api: keyGoogle.key_api,
            description: keyGoogle.description,
        }]
        SaveKeyGoogle(data).then(response => {
            if (response.success === true) {
                Const_Libs.TOAST.success(response.message)
            }
            else {
                Const_Libs.TOAST.error(response.message)
            }
            handleGetAllKeyGg();
            resetData();
        })
    }

    const resetData = () => {
        setKeyGoogle({
            key_api: '',
            description: ''
        })
    }
    return (
        <>
            <button type="button" className="btn btn-primary fw-bolder" data-bs-toggle="modal" data-bs-target="#myModalAddKeyGoogle" style={{ fontSize: '14px' }}>
                Thêm
            </button>
            <div>
                <div className="modal fade" id="myModalAddKeyGoogle">
                    <div className="modal-dialog modal-dialog-centered" style={{ minWidth: '700px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm Key google</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-7">
                                            <label htmlFor="name-campaign" className="form-label fs-6 fw-bolder">Key google</label>
                                            <input type="text"
                                                className="form-control" id="name-campaign"
                                                placeholder="Nhập ở đây"
                                                value={keyGoogle.key_api}
                                                onChange={e => setKeyGoogle({ ...keyGoogle, key_api: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="name-campaign" className="form-label fs-6 fw-bolder">Mô tả</label>
                                            <input type="text"
                                                className="form-control" id="name-campaign"
                                                placeholder="Nhập mô tả"
                                                value={keyGoogle.description}
                                                onChange={e => setKeyGoogle({ ...keyGoogle, description: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleSubmit()}>Submit</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAddKeyGoogle