import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Welcome to My Job Tracker!
          </h1>
          <p>
            Whether you're just starting your career or looking for your next big opportunity, this app will help you stay organized.
            Add jobs, track their status, and never miss an opportunity again!
          </p>
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to='/register' className='btn register-link'>
              Sign Up
            </Link>
            <Link to='/login' className='btn'>
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
