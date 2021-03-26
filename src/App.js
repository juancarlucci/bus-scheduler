import './App.css';
import * as s from './App.styles';

import Sidebar from "./components/Sidebar/Sidebar";
import MainView from "./components/MainView/MainView";

const logo = {
    full:'img/logo.svg',
    simple:'img/logo-simple.svg'
};
const contentTitle = "RemixHome";
const backgroundImage = 'img/texture-wave-navy.png';
const backgroundColor = '#199ADC';
const textColor = '#273d56';
const menuItems = [
    {name: 'Home', to: '/', icon: '/icons/streets-icon.svg', subMenuItems: [] },
    {name: 'Bus Scheduler', to: '/bus', icon: '/icons/bus-icon.svg', subMenuItems: [] },
];

function App() {
  return (
      <s.App>
        <Sidebar
            contentTitle={contentTitle}
            backgroundImage={backgroundImage}
            backgroundColor={backgroundColor}
            textColor={textColor}
            logo={logo}
            menuItems={menuItems}
        />
        <MainView />
      </s.App>
  );
}

export default App;
