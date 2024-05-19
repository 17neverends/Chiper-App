import React, { useState } from 'react';
import { Form, Input, Button, Table, Space, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import ModalView from './ModalView';
import data from '../source/description.json';
import FormProps from '../types/FormProps';
import ResponseData from '../types/ResponseData';
import Result from '../components/Result/Result';

const { TextArea } = Input;
const { Text } = Typography;



const MyForm: React.FC<FormProps> = ({ title, initialText = '', endpoint, description, formName }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [additionalInputValue, setAdditionalInputValue] = useState('');
  const [selectedForm, setSelectedForm] = useState<keyof typeof data | null>(null);
  const [result, setResult] = useState<Array<string | string[][]> | null>(null);
  const [isMatch, setIsMatch] = useState(false);

  const onFinish = async (values: { description: string, additionalInput?: string }) => {
    try {
      let url = `http://127.0.0.1:8000/enc/${endpoint}?data=${values.description}`;
      if (formName === "form_3" && values.additionalInput) {
        url += `&key=${values.additionalInput}`;
      }

      const response = await axios.get<ResponseData>(url);

      if (response.data.square) {
        setResult([response.data.message, response.data.square, response.data.decrypt]);
      } else {
        setResult([response.data.message, response.data.decrypt]);
      }
      setIsMatch(response.data.decrypt === values.description);

    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const showModal = (formKey: keyof typeof data) => {
    setIsModalVisible(true);
    setSelectedForm(formKey);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedForm(null);
  };

  const handleAdditionalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdditionalInputValue(e.target.value);
  };

  const columns = result && Array.isArray(result[1]) && result[1].length > 0 && Array.isArray(result[1][0])
    ? result[1][0].map((_, index) => ({
      dataIndex: `${index}`,
      key: `${index}`
    }))
    : [];

  const dataSource = result && Array.isArray(result[1])
    ? result[1].map((row, index) => ({
      key: `${index}`,
      ...row.reduce((acc, cell, cellIndex) => ({ ...acc, [`${cellIndex}`]: cell }), {}),
    }))
    : [];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>{title}</h2>
      <p onClick={() => showModal(formName as keyof typeof data)} style={{ cursor: 'pointer' }}>
        {description}
      </p>
      <ModalView
        title={title}
        data={selectedForm ? data[selectedForm] : null}
        visible={isModalVisible}
        onClose={closeModal}
      />
      <Form
        name={formName}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ description: initialText }}
      >
        <Form.Item
          name="description"
          rules={[
            { required: true, message: 'Пожалуйста, введите текст для шифрования!' },
          ]}
          style={{ marginBottom: '30px' }}
        >
          <TextArea rows={4} placeholder="Введите текст для шифрования..." />
        </Form.Item>

        {formName === 'form_3' && (
          <Form.Item
            name="additionalInput"
            rules={[{ required: true, message: 'Пожалуйста, введите ключ!' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input placeholder="Введите ключ" value={additionalInputValue} onChange={handleAdditionalInputChange} />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зашифровать
          </Button>
        </Form.Item>
      </Form>

      {result !== null && (
        <div style={{ marginTop: '20px' }}>
          {formName === 'form_3' ? (
            <Result
              encrypt={result[0] as string}
              decrypt={result[1] as string}
            />
          ) : (
            <div>
                <Result
                  encrypt={result[0] as string}
                  decrypt={result[2] as string}
                />
                <Table 
                  dataSource={dataSource}
                  columns={columns}
                  pagination={false}
                  showHeader={false}
                />
              
            </div>
          )}
          {isMatch && (
            <Space style={{marginTop: '20px'}}>
              <Text type="success">Результаты совпадают</Text>
              <CheckCircleOutlined style={{ color: 'green' }} />
            </Space>
          )}
        </div>
      )}
    </div>
  );
};

export default MyForm;
