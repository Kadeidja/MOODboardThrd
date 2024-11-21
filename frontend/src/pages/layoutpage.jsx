import { Outlet } from 'react-router-dom';
import NavbarComp from '../components/navbarcomponent';

function LayoutPage(){
    return (
        <div className="App">
            <NavbarComp />
            <Outlet />
        </div>
    );
}

export default LayoutPage;