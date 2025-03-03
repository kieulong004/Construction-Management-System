import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from '../pages/(admin)/layout'
import DashboardPage from '../pages/(admin)/dashboard'
import Signin from '../pages/(website)/(auth)/signin'
import WorkersPape from '../pages/(admin)/workers/layout'
import ProgressPage from '../pages/(admin)/progress'
import CountPage from '../pages/(admin)/Count'
import EventPage from '../pages/(admin)/event/eventPage'
import SafetyPage from '../pages/(admin)/Safety'
import ExitingPage from '../pages/(admin)/Exiting'
import CheckPage from '../pages/(admin)/Check'
import RatePage from '../pages/(admin)/Rate'
import SitePage from '../pages/(admin)/Site'
import AddLabor from '../pages/labor/_component/add'
import AddContractor from '../pages/contractor/_component/add'
import MyTable from '../components/date'
import LayoutWebsite from '../pages/(website)/layout'
import Homepage from '../pages/(website)/Homepage'
import AboutPage from '../pages/(website)/About'

const Router = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<LayoutWebsite />}>
              <Route index element={<Homepage />} />
              <Route path='about' element={<AboutPage/>} />
            </Route>
            <Route path="admin" element={<LayoutAdmin /> } >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path='workers' element={<WorkersPape/>} />
              <Route path='labor/add' element={<AddLabor/>} />
              <Route path='contractor/add' element={<AddContractor/>} />
              <Route path='progress' element={<ProgressPage/>} />
              <Route path='count' element={<CountPage/>} />
              <Route path='events' element={<EventPage/>} />
              <Route path='safety' element={<SafetyPage/>} />
              <Route path='exiting' element={<ExitingPage/>} />
              <Route path='check' element={<CheckPage/>} />
              <Route path='rate' element={<RatePage/>} />
              <Route path='site' element={<SitePage/>} />
              <Route path='date' element={<MyTable/>} />
            </Route>
            <Route path='signin' element={<Signin />} />
        </Routes>
    </>
  )
}

export default Router