import {useState} from 'react';
import {getAuth, updateProfile} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {updateDoc, doc} from 'firebase/firestore';
import {db} from '../firebase.config';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import {Link} from 'react-router-dom';

function Profile() {
    const auth = getAuth();
    const [changeDetails, setChangeDetails] = useState(false);
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });

    const {name} = formData;

    const onLogOut = () => {
        auth.signOut();
        navigate('/')
    }

    const onChange = (e) => {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id] : e.target.value
            }))
    }

    const onSubmit = async () => {
            try {
                if(auth.currentUser.displayName !== name){
                    await updateProfile(auth.currentUser, {
                        displayName: name
                    })
                }

                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    name
                })
            }
            catch(error) {
               console.log(error); 
            }
    }
        return (
                <>
                {name && <div className="profile">
                <header className="profileHeader">
                    <p className="pageHeader">My Profile</p>
                    <button type='button' className="logOut" onClick={onLogOut}>Log Out</button>
                </header>
                <main>
                    <div className="profileDetailsHeader">
                        <p className="profileDetailsText">Personal Details</p>
                        <p className="changePersonalDetails" onClick={()=>{
                            changeDetails && onSubmit()
                            setChangeDetails((prevState)=> !prevState)
                        }}>
                            {changeDetails ? 'done' : 'change'}
                        </p>
                    </div>
    
                    <div className="profileCard">
                        <form>
                            <input
                            type="text"
                            id="name"
                            className={!changeDetails ? 'profileName' : 'profileNameActive'}
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                            />
                        </form>
                    </div>

                <Link className="createListing" to='/create-listing'>
                            <img src={homeIcon} alt="home" />
                            <p>Sell or rent your home</p>
                            <img src={arrowRight} alt="Arrow Right" />
                </Link>
                </main>
            </div>
    }
                </>
            )
}

export default Profile
