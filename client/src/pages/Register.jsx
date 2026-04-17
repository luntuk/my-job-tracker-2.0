import { Form, redirect, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('/auth/register', data);
    const { token, user } = response.data;
    
    // Save token and user to localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    toast.success('Registration successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};
const Register = () => {
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Join My Job Tracker!</h4>
        <FormRow type='text' name='name' placeholder='Enter your first name' />
        <FormRow type='text' name='lastName' labelText='last name' placeholder='Enter your last name' />
        <FormRow type='text' name='location' placeholder='Your city or location' />
        <FormRow type='email' name='email' placeholder='your.email@example.com' />
        <FormRow type='password' name='password' placeholder='Create a strong password (min 8 chars)' />
        <SubmitBtn />
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Already have an account?
          <Link to='/login' className='member-btn' style={{ color: 'var(--primary-500)', fontWeight: '600' }}>
            Sign In Here
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
