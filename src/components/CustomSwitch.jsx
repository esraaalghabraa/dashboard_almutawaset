import React from 'react'
import { ConfigProvider, Switch, Tooltip } from "antd";
import { BiCheck } from 'react-icons/bi';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const CustomSwitch = ({active, onChange, colorPrimary}) => {
  return (
    <div>
        <ConfigProvider
            theme={{
                inherit:false,
                token:{
                colorPrimary:colorPrimary,
                colorTextQuaternary:'#dc2626',
                colorPrimaryHover:'22c55e',
                colorTextTertiary:'dc2626'
                }
            }}
            >
            <Tooltip title="تغيير الحالة">
              <Switch
              value={active}
              onChange={onChange}
              size='small'
              checkedChildren={<CheckOutlined/>}
              unCheckedChildren={<CloseOutlined/>}
              direction="vertical"
              />
            </Tooltip>
              
        </ConfigProvider>
    </div>
  )
}

export default CustomSwitch
