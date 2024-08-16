import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Upload, Image } from 'antd';
import { MdOutlineCloudUpload } from "react-icons/md";
import CustomModal from './CustomModal';

const CreateSectionModal = ({ visible, onClose, section, onSave }) => {
const [form] = Form.useForm();
const [fileList, setFileList] = useState([]);

useEffect(() => {
    if (section) {
    form.setFieldsValue({
        name: section.name,
        description: section.description,
    });
    if (section.image_url) {
        setFileList([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: section.image_url,
        },
        ]);
    }
    } else {
    form.resetFields();
    setFileList([]);
    }
}, [section, form]);

const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Ensure only one file is kept
};

const handleRemove = () => {
    setFileList([]);
};

const handleOk = async () => {
    try {
    const values = await form.validateFields();
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
    }
    if (section) {
        formData.append('id', section.id);
    }

    onSave(formData);
    onClose();
    form.resetFields();
    setFileList([]);
    } catch (error) {
    console.error('Failed to save section:', error);
    }
};

const getPreviewImageUrl = (file) => {
    if (file.originFileObj) {
    return URL.createObjectURL(file.originFileObj);
    }
    return file.url;
};

return (
    <CustomModal
    title={section ? "تعديل القسم" : "إنشاء قسم جديد"}
    visible={visible}
    onCancel={onClose}
    footer={[
        <Button key="back" onClick={onClose}>
        إغلاق
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
        حفظ
        </Button>,
    ]}
    >
    <Form form={form} layout="vertical">
        <Form.Item
        name="name"
        label="اسم القسم"
        rules={[{ required: true, message: 'Please input the section name!' }]}
        >
        <Input />
        </Form.Item>
        <Form.Item
        name="description"
        label="وصف القسم"
        rules={[{ required: true, message: 'Please input the section description!' }]}
        >
        <Input.TextArea />
        </Form.Item>
        <Form.Item
        name="image"
        label="صورة القسم"
        rules={section ? [] : [{ required: true, message: 'Please upload an image!' }]}
        >
        <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            onRemove={handleRemove}
            showUploadList={false}
        >
            <Button
            className='text-md text-gray-700'
            icon={<MdOutlineCloudUpload className='text-lg' />}
            >
            اضغط هنا
            </Button>
        </Upload>
        {fileList.length > 0 && (
            <div className="mt-4">
            <Image
                width={200}
                src={getPreviewImageUrl(fileList[0])}
                alt='Preview'
            />
            </div>
        )}
        </Form.Item>
    </Form>
    </CustomModal>
);
};

export default CreateSectionModal;
