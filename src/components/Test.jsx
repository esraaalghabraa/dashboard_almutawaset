import { Form, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { fetchCategoriesAsPairs } from "../stores/storeCategory";
import { fetchSub1CategoriesAsPairs } from "../stores/storeSub1Category";

const Test = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [sub1Categories, setSub1Categories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [mainCategoryId, setMainCategoryId] = useState(null);
  const [sub1CategoryId, setSub1CategoryId] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
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
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (mainCategoryId) {
      const loadSub1Categories = async () => {
        setLoading(true);
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
          setLoading(false);
        }
      };

      loadSub1Categories();
    } else {
      setSub1Categories([]); // Clear sub1Categories if no mainCategoryId
      setSub1CategoryId(null); // Reset sub1CategoryId to null
      form.setFieldsValue({ category2_id: undefined }); // Clear the second select in the form
    }
  }, [mainCategoryId, form]);

  return (
    <>
      <Modal open={true}>
        <Form form={form} layout="vertical" className="pl-10 pt-4">
          <Form.Item
            key="category1_id"
            name="category1_id"
            label="أقسام المستوى الأول"
          >
            <Select
              options={categories}
              loading={loading}
              onChange={(value) => {
                setMainCategoryId(value);
                setSub1CategoryId(null); // Reset sub1CategoryId when mainCategoryId changes
                form.setFieldsValue({ category2_id: undefined }); // Clear the value of the second select field in the form
              }}
            />
          </Form.Item>
          <Form.Item
            key="category2_id"
            name="category2_id"
            label="أقسام المستوى الثاني"
          >
            <Select loading={loading} options={sub1Categories} value={sub1CategoryId} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Test;
