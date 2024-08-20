import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Image, DatePicker } from 'antd';
import { MdOutlineCloudUpload } from "react-icons/md";
import CustomModal from './CustomModal';
import CustomSelect from './CustomSelect';
import dayjs from 'dayjs';

const GeneralModal = ({
  visible,
  onClose,
  item,
  onSave,
  formFields,
  title,
  formItemLayout,
  loading,
  withFiles=true
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (item) {
      const initialValues = formFields.reduce((acc, field) => {
        acc[field.name] = item[field.name];
        return acc;
      }, {});
      form.setFieldsValue(initialValues);
      if (item.image_url) {
        setFileList([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: item.image_url,
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [item, form, formFields]);

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Ensure only one file is kept
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.Birthday) {
        values.Birthday = dayjs(values.Birthday).format('YYYY-MM-DD');
      }
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }
      if (item) {
        formData.append('id', item.id);
      }
      await onSave(formData);
      onClose();
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Failed to save item:', error);
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
      bodyStyle={{ maxHeight: '500px', overflowY: 'auto' }} 
      title={title}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          إغلاق
        </Button>,
        <Button loading={loading} key="submit" type="primary" onClick={handleOk}>
          حفظ
        </Button>,
      ]}
    >
      <Form form={form}
      {...formItemLayout} className="pl-10 pt-4">
        {formFields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules}
          >
            {field.type === 'text' && <Input/>}
            {field.type === 'textarea' && <Input.TextArea />}
            {field.type === 'select' && (
              <CustomSelect
                options={field.options}
              />
            )}
            {field.type === 'DatePicker' && <DatePicker />}
          </Form.Item>
        ))}
        {withFiles &&         <Form.Item
          name="file"
          label="صورة"
          rules={item ? [] : [{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            showUploadList={false}
          >
            <Button
              className="text-md text-gray-700"
              icon={<MdOutlineCloudUpload className="text-lg" />}
            >
              اضغط هنا
            </Button>
          </Upload>
          {fileList.length > 0 && (
            <div className="mt-4">
              <Image
                src={getPreviewImageUrl(fileList[0])}
                alt="Preview"
                style={{ width: 100, objectFit: 'cover' }}
                className="w-[100px] object-cover rounded-md"
              />
            </div>
          )}
        </Form.Item> }

      </Form>
    </CustomModal>
  );
};

export default GeneralModal;
