import React from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { axiosNonAuthInstance } from '../../helper/util';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        // khởi tạo giá trị ban đầu
        initialValues: {
            // Dựa vào name của thẻ input
            email: '',
            password: ''
        },

        // Kiểm tra dữ liệu
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Vui lòng nhập email'),
            password: Yup.string()
                .required('Vui lòng nhập password')
        }),

        // Khi dữ liệu hợp lệ sẽ chạy code onSubmit
        onSubmit: async values => {
            try {
                const response = await axiosNonAuthInstance().post('/login', values);
                const action = {
                    type: 'LOGIN_SUCCESS',
                    payload: {
                        access_token: response.data.access_token,
                        loggedUser: response.data.user
                    }
                };
                
                dispatch(action);
                navigate('/admin');

            } catch (error) {
                toast.error(error.message);
            }
        }
    });

    return (
        <>
            <div className="container">
                <div className="card card-login mx-auto mt-5">

                    <div className="card-header card-header-login">
                        <img src="/admin/images/logo.jpg" alt="" />
                    </div>

                    <div className="card-body">
                        <form action="#" onSubmit={formik.handleSubmit}>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="email" name="email" className="form-control" placeholder="Tài khoản"
                                        onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                                    <label htmlFor="username">Tài khoản</label>
                                    {
                                        formik.touched.email && formik.errors.email ?
                                            <div className='text-danger'>{formik.errors.email}</div> : null
                                    }
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" name="password" className="form-control" placeholder="Mật khẩu"
                                        onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                                    <label htmlFor="password">Mật khẩu</label>
                                    {
                                        formik.touched.password && formik.errors.password ?
                                            <div className='text-danger'>{formik.errors.password}</div> : null
                                    }
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" defaultValue="remember-me" name="remember-me" />
                                        Nhớ mật khẩu
                                    </label>
                                </div>
                            </div>

                            <buton style={{ cursor: "pointer" }} className="btn btn-primary btn-block" >Đăng nhập</buton>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
