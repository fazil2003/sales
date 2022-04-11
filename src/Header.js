import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faCircleCheck, faPeopleArrows, faFileCode, faGear } from '@fortawesome/free-solid-svg-icons'

function Header() {

    // TO FIND WHICH MENU IS SELECTED
    var selectedOption = window.location.href;
    const webAddressArray = selectedOption.split("/");
    const finalAddress = webAddressArray[webAddressArray.length-1];

    return (
        <div className="header">

            <img className="header-img" src={process.env.PUBLIC_URL + '/images/icon-sales.png'} alt="logo" />

            <div className="navbar">

                {/* PRODUCTS */}
                {finalAddress === "" ? (
                    <a href="/">
                        <button title="Add/Manage your products" className="items selected-option"><FontAwesomeIcon icon={faBox} className="icon" />&nbsp;&nbsp;Products</button>
                    </a>
                ) : (
                    <a href="/">
                        <button title="Add/Manage your products" className="items"><FontAwesomeIcon icon={faBox} className="icon" />&nbsp;&nbsp;Products</button>
                    </a>
                )}

                {/* SALES */}
                {finalAddress === "sales" ? (
                    <a href="/sales">
                        <button title="Add/Manage your product sales" className="items selected-option"><FontAwesomeIcon icon={faCircleCheck} className="icon" />&nbsp;&nbsp;Sales</button>
                    </a>
                ) : (
                    <a href="/sales">
                        <button title="Add/Manage your product sales" className="items"><FontAwesomeIcon icon={faCircleCheck} className="icon" />&nbsp;&nbsp;Sales</button>
                    </a>
                )}

                {/* CUSTOMERS */}
                {finalAddress === "customers" ? (
                    <a href="/customers">
                        <button title="Add/Manage your customers" className="items selected-option"><FontAwesomeIcon icon={faPeopleArrows} className="icon" />&nbsp;&nbsp;Customers</button>
                    </a>
                ) : (
                    <a href="/customers">
                        <button title="Add/Manage your customers" className="items"><FontAwesomeIcon icon={faPeopleArrows} className="icon" />&nbsp;&nbsp;Customers</button>
                    </a>
                )}

                {/* REPORTS */}
                {finalAddress === "reports" ? (
                    <a href="/reports">
                        <button title="Generate the sales reports" className="items selected-option"><FontAwesomeIcon icon={faFileCode} className="icon" />&nbsp;&nbsp;Reports</button>
                    </a>
                ) : (
                    <a href="/reports">
                        <button title="Generate the sales reports" className="items"><FontAwesomeIcon icon={faFileCode} className="icon" />&nbsp;&nbsp;Reports</button>
                    </a>
                )}

                {/* SETTINGS */}
                {finalAddress === "settings" ? (
                    <a href="/settings">
                        <button title="Add/Manage your settings" className="items selected-option"><FontAwesomeIcon icon={faGear} className="icon" />&nbsp;&nbsp;Settings</button>
                    </a>
                ) : (
                    <a href="/settings">
                        <button title="Add/Manage your settings" className="items"><FontAwesomeIcon icon={faGear} className="icon" />&nbsp;&nbsp;Settings</button>
                    </a>
                )}

            </div>

        </div>
    );
}

export default Header;
