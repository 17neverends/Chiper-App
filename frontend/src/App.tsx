import React from 'react';
import { Tabs } from 'antd';
import MyForm from './views/TextForm';

const App: React.FC = () => {
  const size = 'large';

  const tabData = [
    { key: '1', label: 'Магический квадрат', endpoint: 'magic', description: 'Теория по Магическому квадрату' },
    { key: '2', label: 'Квадрат Полибия (шахматный)', endpoint: 'chess', description: 'Теория по Шахматному шифру' },
    { key: '3', label: 'Шифр гаммирования "XOR"', endpoint: 'xor', description: 'Теория по Шифру Гаммирования (XOR)' }
  ];

  return (
    <div>
      <Tabs
        centered
        defaultActiveKey="1"
        size={size}
        style={{ marginBottom: 32 }}
        items={tabData.map(tab => ({
          label: `Шифр из группы ${tab.key}`,
          key: tab.key,
          children: (
            <MyForm
              title={tab.label}
              initialText=''
              endpoint={tab.endpoint}
              description={tab.description}
              formName={`form_${tab.key}`}
            />
          ),
        }))}
      />
    </div>
  );
};

export default App;
