import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
const Register = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Nice to Meet You</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button className="primary-button my-2" htmlType="submit">
            REGISTER
          </Button>
          <Link to="/login" className="anchor">
            CLick Here to Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
