import { CustomSelect } from '../components';


const MainSectionFilter = ({ onChange }) => {
return (
    <CustomSelect
        placeholder="الأقسام الرئيسية"
        allowClear
        onChange={onChange}
        className="" // Tailwind CSS for select
        dropdownClassName="" // Tailwind CSS for dropdown
        options={[
            { label: 'القسم 1', value: 'Jack' },
            { label: 'القسم 2', value: 'Lucy' },
            { label: 'القسم 3', value: 'yiminghe' },
            { label: 'القسم 4', value: 'Disabled', disabled: true },
        ]}
    />
);
};

export default MainSectionFilter;