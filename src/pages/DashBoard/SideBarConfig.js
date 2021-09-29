import { Icon } from '@iconify/react';
import React from 'react';
const color = '#6b7280';

const getIcon = (name, color) => <Icon icon={name} width={22} height={22} color={color} />;

const SideBarConfig = [
  {
    title: 'Thông tin khách hàng',
    path: '/dashboard/user',
    icon: getIcon('majesticons:user-group', color),
  },
  {
    title: 'Tác giả',
    path: '/dashboard/author',
    icon: getIcon('carbon:user-filled', color),
  },
];

export default SideBarConfig;
