import {NavLink, useLocation, useNavigate,} from "react-router-dom"
import {ReactComponent as ProfileIcon} from '../../Assets/Icons//profile.svg';
import {ReactComponent as TagsIcon} from '../../Assets/Icons//tags.svg';
import {ReactComponent as WarehouseIcon} from '../../Assets/Icons/warehouse.svg';
import {ReactComponent as ReportsIcon} from '../../Assets/Icons/reports.svg';
import {ReactComponent as OrdersIcon} from '../../Assets/Icons/orders.svg';
import {ReactComponent as ItemsIcon} from '../../Assets/Icons/items.svg';
import {ReactComponent as ExitIcon} from '../../Assets/Icons/exit.svg';
import {ReactComponent as MerchantIcon} from '../../Assets/Icons/store.svg'
import {ReactComponent as PartnerIcon} from '../../Assets/Icons/partner.svg'
import logo from '../../Assets/Logos/logo_white.svg';
import {setSignUpEmail} from "../../Redux/Slices/signUpEmailAddress";
import {setCurrentUser} from "../../Redux/Slices/currentUser";
import {useDispatch} from "react-redux";
import {useState} from "react";

const useHandleLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem("token");
        dispatch(setCurrentUser({}));
        dispatch(setSignUpEmail(""));
        setTimeout(() => navigate("/signin"), 0);
    };
};


const SideBar = () => {
    const location = useLocation();
    const handleLogout = useHandleLogout()
    const [showPopup, setShowPopup] = useState(false);

    const handleClosePopup = () => setShowPopup(false);

    const handleOpenPopup = () => setShowPopup(true);

    if (!['/signin', '/signup', '/verification', '/congratulations', '/merchants/new'].includes(location.pathname)) {
        return (

            <>
                <div
                    className="flex justify-between py-10 left-0 top-0 h-screen flex-col w-48 bg-gradient-to-b from-gradientFrom to-gradientTo">
                    <div>
                        <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center">
                                <img src={logo} alt="Invenflow Logo" className="w-8 h-8 mr-1 flex justify-center"/>
                                <h1 className="text-white text-xl font-bold">InvenFlow</h1>
                            </div>
                        </div>
                        <div className="mt-10 overflow-x-hidden">
                            <NavLink to="/merchants/me">
                                {({isActive}) => (
                                    <button
                                        className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                        <MerchantIcon className="mr-2"/>
                                        Merchant
                                    </button>
                                )}
                            </NavLink>
                            <NavLink to="/items">
                                {({isActive}) => (
                                    <button
                                        className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                        <ItemsIcon className="mr-2"/>
                                        Items
                                    </button>
                                )}
                            </NavLink>
                            <NavLink to="/orders">
                                {({isActive}) => (
                                    <button
                                        className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                        <OrdersIcon className="mr-2"/>
                                        Orders
                                    </button>
                                )}
                            </NavLink>
                            <NavLink to="/reports">
                                {({isActive}) => (
                                    <button
                                        className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                        <ReportsIcon className="mr-2"/>
                                        Reports
                                    </button>
                                )}
                            </NavLink>
                            {/*              <NavLink to="/tags">
                {({isActive}) => (
                    <button
                        className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                      <TagsIcon className="mr-2"/>
                      Tags
                    </button>
                )}
              </NavLink>*/}
                            <NavLink to="/partners">
                                {({isActive}) => (
                                    <button
                                        className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                        <PartnerIcon className="mr-2"/>
                                        Partners
                                    </button>
                                )}
                            </NavLink>
                            <NavLink to="/warehouses">
                                {({isActive}) => (
                                    <button
                                        className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                        <WarehouseIcon className="mr-2"/>
                                        Warehouses
                                    </button>
                                )}
                            </NavLink>

                        </div>
                    </div>
                    <div>
                        <div className=' bottom-10 left-0 overflow-x-hidden'>
                            <NavLink to="/profile">
                                {({isActive}) => (
                                    <button
                                        className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                        <ProfileIcon className="mr-2"/>
                                        Profile
                                    </button>
                                )}
                            </NavLink>
                            <button className={`flex mt-50 items-start w-full text-left mt-4 text-white`}
                                    onClick={handleLogout}>
                                < ExitIcon className="mr-2"/>
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </>

        );
    } else if (['/merchants/new'].includes(location.pathname)) {
        return (
            <>

                {showPopup && (
                    <div
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                        onClick={handleClosePopup}
                    >
                        <div className="bg-white p-8 rounded-lg z-60">
                            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                            <p>Register a merchant first to access functionalities of InvenFlow.</p>
                            <button className="bg-ifOrange text-white" onClick={handleClosePopup}>Close</button>
                        </div>
                    </div>
                )}
                <div
                    className="relative flex py-10 left-0 top-0 h-screen flex-col w-48 bg-gradient-to-b from-gradientFrom to-gradientTo z-10">
                    <div
                        className="absolute left-0 bottom-20 w-full h-3/4 bg-black bg-opacity-50 z-50"
                        onClick={handleOpenPopup}
                    ></div>
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="Invenflow Logo" className="w-8 h-8 mr-5"/>
                        <h1 className="text-white text-xl font-bold">InvenFlow</h1>
                    </div>
                    <div className="mt-10">
                        <NavLink to="/merchants/me">
                            {({isActive}) => (
                                <button
                                    className={`flex items-center w-full text-left mt-4 ${
                                        isActive
                                            ? 'bg-white bg-opacity-60 text text-rgba(58, 89, 84, 1) mx-2'
                                            : 'text-white'
                                    }`}
                                >
                                    <MerchantIcon className="mr-2"/>
                                    Merchant
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/items">
                            {({isActive}) => (
                                <button
                                    className={`flex items-center w-full text-left mt-4 ${
                                        isActive
                                            ? 'bg-white bg-opacity-60 text text-rgba(58, 89, 84, 1) mx-2'
                                            : 'text-white'
                                    }`}
                                >
                                    <ItemsIcon className="mr-2"/>
                                    Items
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/orders">
                            {({isActive}) => (
                                <button
                                    className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                    <OrdersIcon className="mr-2"/>
                                    Orders
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/reports">
                            {({isActive}) => (
                                <button
                                    className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                    <ReportsIcon className="mr-2"/>
                                    Reports
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/tags">
                            {({isActive}) => (
                                <button
                                    className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                    <TagsIcon className="mr-2"/>
                                    Tags
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/partners">
                            {({isActive}) => (
                                <button
                                    className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                    <PartnerIcon className="mr-2"/>
                                    Partners
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/warehouses">
                            {({isActive}) => (
                                <button
                                    className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'}`}>
                                    <WarehouseIcon className="mr-2"/>
                                    Warehouses
                                </button>
                            )}
                        </NavLink>

                    </div>
                    <div className='absolute bottom-10 left-0'>
                        <NavLink to="/profile">
                            {({isActive}) => (
                                <button
                                    className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1) mx-2' : 'text-white'} `}
                                >
                                    <ProfileIcon className="mr-2"/>
                                    Profile
                                </button>
                            )}
                        </NavLink>
                        <button className={`flex items-center w-full text-left mt-4 ${'text-white'}`}
                                onClick={handleLogout}>
                            < ExitIcon className="mr-2"/>
                            Log out
                        </button>
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
}
export default SideBar;



