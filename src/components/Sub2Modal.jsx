import { Button, Form, Image, Input, Modal, notification, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { fetchCategoriesAsPairs } from "../stores/storeCategory";
import { fetchSub1CategoriesAsPairs } from "../stores/storeSub1Category";
import CustomModal from "./CustomModal";
import { MdOutlineCloudUpload } from "react-icons/md";

const Sub2Modal = ({
    visible,
    onClose,
    item,
    onSave,
}) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sub1Categories, setSub1Categories] = useState([]);
  
    const [mainCategoryId, setMainCategoryId] = useState(null);
    const [sub1CategoryId, setSub1CategoryId] = useState(null);
    const [loadingSelectMainCategory, setLoadingSelectMainCategory] = useState(true);
    const [loadingSelectSub1Category, setLoadingSelectSub1Category] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
          setLoadingSelectMainCategory(true);
          try {
            const result = await fetchCategoriesAsPairs();
            const categoriesData = result.map((option) => ({
              label: option.name,
              value: option.id,
            }));
            setCategories(categoriesData);
          } catch (error) {
            notification.error({
              message: 'Error',
              description: error.message,
            });
          } finally {
            setLoadingSelectMainCategory(false);
          }
        };
    
        loadCategories();
      }, []);
    
      useEffect(() => {
        if (mainCategoryId) {
          const loadSub1Categories = async () => {
            setLoadingSelectSub1Category(true);
            try {
              const result = await fetchSub1CategoriesAsPairs(mainCategoryId);
              const sub1CategoriesData = result.map((option) => ({
                value: option.id,
                label: option.name,
              }));
              setSub1Categories(sub1CategoriesData);
            } catch (error) {
              notification.error({
                message: 'Error',
                description: error.message,
              });
            } finally {
              setLoadingSelectSub1Category(false);
            }
          };
    
          loadSub1Categories();
        } else {
          setSub1Categories([]); // Clear sub1Categories if no mainCategoryId
          setSub1CategoryId(null); // Reset sub1CategoryId to null
          form.setFieldsValue({ category2_id: undefined }); // Clear the second select in the form
        }
      }, [mainCategoryId, form]);
    
      useEffect(() => {
        if (item) {
          form.setFieldsValue({
            name: item.name,
            description: item.description,
            category2_id: item.category2_id,
            });

            setSub1CategoryId(item.category2_id);

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
      }, [item, form]);

      // Reset form fields and fileList when modal closes
      useEffect(() => {
        if (!visible) {
          form.resetFields();
          setFileList([]);
          setMainCategoryId(null);
          setSub1CategoryId(null);
        }
      }, [visible]);

      const handleUploadChange = ({ fileList }) => {
        setFileList(fileList.slice(-1)); // Ensure only one file is kept
      };

      const handleOk = async () => {
        try {
          const values = await form.validateFields();
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
          onClose();  // Call onClose after saving
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
          title={item ? "تعديل القسم" : "إنشاء قسم جديد"}
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
          <Form form={form} layout="vertical" className="pl-10 pt-4">
          <Form.Item
                key='name'
                name='name'
                label='اسم القسم'
                rules={[{ required: true, message: 'الرجاء إدخال اسم القسم!' }]}
              >
                <Input />
          </Form.Item>
          <Form.Item
                key='description'
                name='description'
                label='الوصف'
                rules={[{ required: false }]}
              >
                <Input.TextArea />
          </Form.Item>
            {!item && (
              <Form.Item
                key="category1_id"
                name="category1_id"
                label="أقسام المستوى الأول"
              >
                <Select
                  options={categories}
                  loading={loadingSelectMainCategory}
                  onChange={(value) => {
                    setMainCategoryId(value);
                    setSub1CategoryId(null); // Reset sub1CategoryId when mainCategoryId changes
                    form.setFieldsValue({ category2_id: undefined }); // Clear the value of the second select field in the form
                  }}
                />
              </Form.Item>
            )}

            <Form.Item
              key="category2_id"
              name="category2_id"
              label="أقسام المستوى الثاني"
            >
              <Select loading={loadingSelectSub1Category} options={sub1Categories} value={sub1CategoryId} />
            </Form.Item>
            <Form.Item
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
            </Form.Item>
          </Form>
        </CustomModal>
      );
}

export default Sub2Modal;
