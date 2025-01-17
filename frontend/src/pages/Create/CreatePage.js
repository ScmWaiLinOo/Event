import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory, useLocation } from 'react-router-dom';
import styles from './CreatePage.module.scss';

const CreatePage = () => {
  const history = useHistory();
  const location = useLocation().pathname;
  const [createForm, setCreateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  const mounted = useRef(false);

  const [formData, setFormData] = React.useState({
    'name': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
    'phone': ''
  });

  React.useEffect(() => {
    if (!mounted.current) {
      checkURL();
    }
    mounted.current = true;

    function checkURL() {
      if (location === '/admin/user/create') {
        setCreateForm(true);
      }
      else {
        setUpdateForm(true);
        setDisabledSubmitBtn(false);
        setValidated(true);
        setFormData({
          'name': 'userA',
          'email': 'usera@gmail.com',
          'password': 'usera@123',
          'confirmPassword': 'usera@123',
          'phone': '09450000888'
        });
      }
    }
  }, []);

  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [disabledSubmitBtn, setDisabledSubmitBtn] = React.useState(true);
  const [validated, setValidated] = React.useState(false);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let preFormData = formData;
    preFormData[name] = value;
    setFormData({ ...preFormData });

    if (preFormData.name && preFormData.email && preFormData.password && preFormData.confirmPassword && preFormData.phone) {
      setDisabledSubmitBtn(false);
    } else {
      setDisabledSubmitBtn(true);
    }

    let valid = validateInput(preFormData);
    if (valid) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  const validateInput = (preFormData) => {
    if (preFormData.password.length > 0 && preFormData.password.length < 8) {
      errors.password = "Passwords should be at least 8 characters.";
    } else {
      errors.password = '';
    }

    if (preFormData.password !== preFormData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match! Please try again.";
    } else {
      errors.confirmPassword = '';
    }

    let digitPattern = new RegExp("^[0-9]{0,11}$");
    if (!digitPattern.test(preFormData.phone)) {
      errors.phone = "Invalid phone number format! Please try again.";
    } else if (preFormData.phone && digitPattern.test(preFormData.phone) && preFormData.phone.length > 0 && preFormData.phone.length < 11)
      errors.phone = "Phone number should be at least 11 characters! Please try again.";
    else {
      errors.phone = '';
    }
    if (errors.password || errors.confirmPassword || errors.phone) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validated) {
      history.push('/admin/home');
    }
  };

  const handleClear = () => {
    setFormData({
      'name': '',
      'email': '',
      'password': '',
      'confirmPassword': '',
      'phone': ''
    });
  }

  return (
    <Container className={styles.container}>
      {createForm && <h1 className={styles.registerTtl}> User Create Form </h1>}
      {updateForm && <h1 className={styles.registerTtl}> User Update Form </h1>}
      <Form validated={validated} noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            required
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.formControl}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formControl}
          />
          <Form.Control.Feedback type="invalid">
            Email is invalid
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            required
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.formControl}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            required
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={styles.formControl}
            isInvalid={errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            required
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={styles.formControl}
            isInvalid={errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex mt-5 justify-content-around">
          <Button type="reset" className={styles.resetBtn} onClick={handleClear}>
            Clear
          </Button>
          {createForm &&
            <Button type="submit" className={styles.registerBtn} disabled={disabledSubmitBtn}>
              Create
            </Button>
          }
          {updateForm &&
            <Button type="submit" className={styles.registerBtn} disabled={disabledSubmitBtn}>
              Update
            </Button>
          }
        </div>
      </Form>
    </Container>
  );
}

export default CreatePage;
