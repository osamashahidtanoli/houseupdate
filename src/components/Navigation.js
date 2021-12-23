import {useNavigate, useLocation} from 'react-router-dom';
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg';
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg';
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg';

function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathRouteMatch = (route) => {
        if(route === location.pathname){
            return true;
        }
    }
    return (
        <footer className="navbar">
                <nav className='navbarNav'>
                    <ul className='navbarListItems'>
                        <li className='navbarListItem' onClick={() => navigate('/')}>
                            <ExploreIcon fill={pathRouteMatch('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                            <p className={pathRouteMatch('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                        </li>
                        <li className='navbarListItem' onClick={() => navigate('/offer')}>
                            <OfferIcon fill={pathRouteMatch('/offer') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                            <p className={pathRouteMatch('/offer') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offer</p>
                        </li>
                        <li className='navbarListItem' onClick={() => navigate('/profile')}>
                            <PersonOutlineIcon fill={pathRouteMatch('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                            <p className={pathRouteMatch('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                        </li>
                    </ul>
                </nav>
        </footer>
    )
}

export default Navigation;
