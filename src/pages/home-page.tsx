import BatteryIndicator from '../components/battery-indicator';
import Navbar from '../layouts/navbar';

function HomePage() {
  return (
    <>
      <Navbar />
      <BatteryIndicator />
    </>
  );
}

export default HomePage;
