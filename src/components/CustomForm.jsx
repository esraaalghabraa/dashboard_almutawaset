import {Form} from 'antd';
import React from 'react';
import { CustomInput } from './CustomInput';


const CustomForm = ({children, onFinish}) => {
    return (
            <Form
                className='py-10'
                wrapperCol={{
                span: 20,
                }}
                layout="horizontal"
                style={{
                maxWidth: 600,
                }}
                onFinish={onFinish}
            >
            {/* {React.Children.map(children, (child) => (
                <Form.Item>{child}</Form.Item>
            ))} */}
            <Form.Item
            name="name_category"
            label="اسم القسم"
            hasFeedback
            rules={[
                {
                    require:true,
                    message:"اسم القسم مطلوب"
                }
            ]}
            >
        <CustomInput hint="اسم القسم" size='middle'/>
            </Form.Item>
        </Form>
    )
}

export default CustomForm
