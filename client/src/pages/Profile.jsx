import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      <div className='form'>
        <h4 className='form-title'>my profile</h4>
        <div className='form-center'>
          <div className='form-row'>
            <label className='form-label'>name</label>
            <p className='form-input'>{name}</p>
          </div>
          <div className='form-row'>
            <label className='form-label'>last name</label>
            <p className='form-input'>{lastName}</p>
          </div>
          <div className='form-row'>
            <label className='form-label'>email</label>
            <p className='form-input'>{email}</p>
          </div>
          <div className='form-row'>
            <label className='form-label'>location</label>
            <p className='form-input'>{location}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Profile;
