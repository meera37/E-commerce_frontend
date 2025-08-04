import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoginApi, registerApi } from '../services/allApi';

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setUserDetails({ username: '', email: '', password: '' });
  };

  const handleRegister = async () => {
    setLoading(true);
    const { username, email, password } = userDetails;

    if (!username || !email || !password) {
      toast.warning('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      const res = await registerApi({ username, email, password });
      console.log("Register response:", res);

      if (res.status === 201) {
        toast.success('Registered successfully');
        setIsRegister(false);
        setUserDetails({ username: '', email: '', password: '' });
      } else {
        toast.error(res.response?.data?.message || 'Registration failed');
      }
    } catch (err) {
      console.log("Register error:", err);
      toast.error(err.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };



  const handleLogin = async () => {
    setLoading(true);
    const { email, password } = userDetails;

    if (!email || !password) {
      toast.warning('Please fill all fields');
      setLoading(false);
    } else {
      try {
        const res = await LoginApi({ email, password });
        if (res.status === 201) {
          toast.success('Login Successful');
          const role = res.data.isAdmin ? 'admin' : 'user';

          sessionStorage.setItem('user', JSON.stringify({ email, role, token: res.data.token }));
          setTimeout(() => navigate(role === 'admin' ? '/admin' : '/'), 1500);
        } else {
          toast.error(res.response?.data?.message || 'Login failed');
        }
      } catch (err) {
        toast.error('Invalid credentials');
      } finally {
        setLoading(false);
      }
    }
  };



  return (
    <>
      <Container className='d-flex align-items-center justify-content-center min-vh-100 bg-white'>
        <Row className='w-100' style={{ maxWidth: '400px' }}>
          <Col>
            <Card className='shadow-sm p-4'>
              <h3 className='text-center mb-4'>{isRegister ? 'Register' : 'Login'}</h3>

              <Form>
                {isRegister && (
                  <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter username'
                      value={userDetails.username}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, username: e.target.value })
                      }
                    />
                  </Form.Group>
                )}

                <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, email: e.target.value })
                    }
                  />
                </Form.Group>



                <Form.Group className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <div className='position-relative'>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Enter password'
                      value={userDetails.password}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, password: e.target.value })
                      }
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      onClick={() => setShowPassword(!showPassword)}
                      className='position-absolute end-0 top-50 translate-middle-y me-3 text-secondary'
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </Form.Group>

                <Button
                  variant='success'
                  className='w-100 mb-3'
                  onClick={isRegister ? handleRegister : handleLogin}
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
                </Button>


              </Form>

              <div className='text-center'>
                {isRegister ? (
                  <p>
                    Already have an account?{' '}
                    <span
                      className='text-primary'
                      style={{ cursor: 'pointer' }}
                      onClick={handleToggle}
                    >
                      Login
                    </span>
                  </p>
                ) : (
                  <p>
                    New user?{' '}
                    <span
                      className='text-primary'
                      style={{ cursor: 'pointer' }}
                      onClick={handleToggle}
                    >
                      Register
                    </span>
                  </p>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <ToastContainer position='top-center' autoClose={2000} theme='colored' /> */}
    </>
  );
}

export default Auth;
