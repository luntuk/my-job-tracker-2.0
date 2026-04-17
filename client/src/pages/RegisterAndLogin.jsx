import { useState, useEffect } from 'react';
import { Form, redirect, Link, useLocation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const isRegister = data.isRegister === 'true';

  try {
    const endpoint = isRegister ? '/auth/register' : '/auth/login';
    const response = await customFetch.post(endpoint, data);
    const { token, user } = response.data;
    
    // Save token and user to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    toast.success(isRegister ? 'Registration successful' : 'Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const RegisterAndLogin = () => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.pathname === '/register');

  useEffect(() => {
    setIsRegister(location.pathname === '/register');
  }, [location.pathname]);

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>{isRegister ? 'Join My Job Tracker!' : 'Welcome Back!'}</h4>
        
        {isRegister && (
          <>
            <FormRow type='text' name='name' placeholder='Enter your first name' />
            <FormRow type='text' name='lastName' labelText='last name' placeholder='Enter your last name' />
            <FormRow type='text' name='location' placeholder='Your city or location' />
          </>
        )}
        
        <FormRow type='email' name='email' placeholder='your.email@example.com' />
        <FormRow type='password' name='password' placeholder={isRegister ? 'Create a strong password (min 8 chars)' : 'Enter your password'} />
        
        <input type='hidden' name='isRegister' value={isRegister} />
        
        <SubmitBtn />
        

        
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          {isRegister ? 'Already have an account?' : 'New here?'}
          <button type='button' onClick={() => setIsRegister(!isRegister)} className='member-btn' style={{ color: 'var(--primary-500)', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer' }}>
            {isRegister ? 'Sign In Here' : 'Create Your Account'}
          </button>
        </p>
      </Form>
    </Wrapper>
  );
};

export default RegisterAndLogin;