import { Link, Form, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post('/auth/login', data);
      const { token, user } = response.data;
      
      // Save token and user to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      queryClient.invalidateQueries();
      toast.success('Login successful');
      return redirect('/dashboard');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const Login = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Welcome Back!</h4>
        <FormRow type='email' name='email' placeholder='Enter your email' />
        <FormRow type='password' name='password' placeholder='Enter your password' />
        <SubmitBtn />
        
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          New here? 
          <Link to='/register' className='member-btn' style={{ color: 'var(--primary-500)', fontWeight: '600' }}>
            Create Your Account
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
