import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

function ForgetPassword() {
    const [email, setEmail] = useState('');
    const onChange = (e) => {
        setEmail(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            const auth = getAuth();
            await sendPasswordResetEmail(auth,email);
            toast.success('email was send');
        }
        catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }


    return (
        <div className='pageContainer'>
            <header>
                <p className='pageHeader'>Forgot Password</p>

            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <input className='emailInput' id='email' onChange={onChange} value={email} />
                    <button type='submit'>Send</button>
                </form>
            </main>
        </div>
    )
}

export default ForgetPassword
