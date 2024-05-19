import React from 'react';
import { Modal, Typography, List } from 'antd';
import ModalViewProps from '../types/ModalViewProps';

const { Title, Paragraph } = Typography;


const ModalView: React.FC<ModalViewProps> = ({ title, data, visible, onClose }) => {
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={<span style={{ fontSize: '25px', textAlign: 'center' }}>{title}</span>}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
      width={700}
      footer={null}
    >
      {data ? (
        <>
          <Paragraph style={{ textAlign: 'left', fontSize: '17px', marginBottom: '40px', marginTop: '20px' }}>{data.history}</Paragraph>
          <Title level={4} style={{ textAlign: 'center' }}>Шаги шифрования:</Title>
          <List
            dataSource={data.encryption_steps}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text style={{fontSize: '16px'}}>{item}</Typography.Text>
              </List.Item>
            )}
          />
          <Title level={4} style={{ textAlign: 'center' }}>Шаги дешифрования:</Title>
          <List
            dataSource={data.decryption_steps}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text style={{fontSize: '16px'}}>{item}</Typography.Text>
              </List.Item>
            )}
          />
        </>
      ) : (
        <Paragraph>Загрузка данных...</Paragraph>
      )}
    </Modal>
  );
};

export default ModalView;
