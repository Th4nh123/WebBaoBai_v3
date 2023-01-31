import React, { useState } from 'react';

import $ from 'jquery'

import { useSelector } from 'react-redux';

import { SaveKeyYoutube } from '../AjaxPost/KeyYoutube';

import { Const_Libs } from '../Toast';

const ModalAddKeyYoutube = (props) => {
    const [keyYoutube, setKeyYoutube] = useState({
        key_api: '',
        description: ''
    })

    const { handleGetAllKeyYt } = props;

    const data_key_youtube = useSelector(state => state.base.data_key_youtube)

    const handleSubmit = () => {
        if (data_key_youtube.length > 0) {
            if ($(`.youtube-item-${data_key_youtube[0]._id}`).css("background-color") !== "rgba(0, 0, 0, 0)") {
              Const_Libs.TOAST.error("Hãy dừng test key trước khi thực hiện thao tác")
              return;
            }
          }
        let data = [{
            key_api: keyYoutube.key_api,
            description: keyYoutube.description
        }]
        SaveKeyYoutube(data).then(response => {
            if (response.success === true) {
                Const_Libs.TOAST.success(response.message)
            }
            else {
                Const_Libs.TOAST.error(response.message)
            }
            handleGetAllKeyYt();
            resetData();
        })
        // .catch(err => { Const_Libs.TOAST.error("Thêm thất bại"); })

    }

    const resetData = () => {
        setKeyYoutube({
            key_api: '',
            description: ''
        })
    }

    return (
        <>
            <button type="button" className="btn btn-primary fw-bolder" data-bs-toggle="modal" data-bs-target="#myModalAddKeyYoutube" style={{ fontSize: '14px' }}>
                Thêm
            </button>
            <div>
                <div className="modal fade" id="myModalAddKeyYoutube">
                    <div className="modal-dialog modal-dialog-centered" style={{ minWidth: '700px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm Key Youtube</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-7">
                                            <label htmlFor="name-campaign" className="form-label fs-6 fw-bolder">Key Youtube</label>
                                            <input type="text"
                                                className="form-control" id="name-campaign"
                                                placeholder="Nhập ở đây"
                                                value={keyYoutube.key_api}
                                                onChange={e => setKeyYoutube({ ...keyYoutube, key_api: e.target.value })}
                                            />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="name-campaign" className="form-label fs-6 fw-bolder">Mô tả</label>
                                            <input type="text"
                                                className="form-control" id="name-campaign"
                                                placeholder="Nhập mô tả"
                                                value={keyYoutube.description}
                                                onChange={e => setKeyYoutube({ ...keyYoutube, description: e.target.value })}
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

export default ModalAddKeyYoutube