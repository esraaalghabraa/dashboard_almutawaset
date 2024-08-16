import React, { useRef } from 'react'
import { useStateContext } from '../../context/ContextProvider';
import CustomButton from '../CustomButton';


import { Checkbox, Form, Input } from 'antd';
import ApiService from '../../data/api_service';
import { Link } from 'react-router-dom';

const Login = () => {
    const passwordRef = useRef();
    const phoneRef = useRef();
    const {setUser, setToken} = useStateContext();

    const onFinish = async (values) => {
        try{
          const result = await ApiService.post({
            subUrl: '/login',
            needToken: false,
            data: values
          });
          console.log(result.user)
          setUser(result.user);
          setToken(result.token);
        }catch(error){
          const response = error.response;
          if (response && response.status === 422){
            console.log(response.data.message);
          }
        }
    }

  return (
    <>
    <div className='min-h-screen flex justify-center items-center'>
    <div className='max-w-[500px] relative z-1 p-8 border-2 shadow-lg'>
    <h1 className="text-22 mb-4">
        سجل الدخول الى حسابك
    </h1>
    <Form
      layout="vertical" autoComplete="off"
      onFinish={onFinish}
      name="normal_login"
      className=""
      initialValues={{
        remember: false,
      }}
    >
      <Form.Item
        label="رقم الهاتف"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input
          type="email" ref={phoneRef}
          size='middle' style={{ width: '20rem' }}
          placeholder="رقم الهاتف"
          />
      </Form.Item>
      <Form.Item
        label="كلمة المرور"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          placeholder="كلمة المرور"
          style={{ width: '20rem' }}
          size='middle'
          ref={passwordRef}
        />
      
      </Form.Item>
      <Form.Item>
        <div className='float-left'>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>تذكرني</Checkbox>
        </Form.Item>
        </div>
        <Link className="float-right">
          نسيت كلمة السر؟
        </Link>
      </Form.Item>

      <Form.Item>
      <CustomButton block={true} htmlType='submit' text="تسجيل الدخول" type="primary"
      />
      </Form.Item>
    </Form>
      </div>
    </div>
    </>
  )
}

export default Login
