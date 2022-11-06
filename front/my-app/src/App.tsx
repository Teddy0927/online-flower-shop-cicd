import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import UserSetting from './Components/UserSetting';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Test from './pages/Test';
import UserOrder from './Components/UserOrder';
import User from './pages/User';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Footer from './Components/Footer';
import WhyUs from './pages/Why';
import AboutUs from './pages/AboutUs';
import AboutFlower from './pages/AboutFlower';
import Guide from './pages/Guide';
import Shipping from './pages/Shipping';
import Customization from './pages/Customization';
import CheckOut from './pages/CheckOut';
import Payment from './pages/Payment';
import { useAppDispatch, useAppSelector } from './store';
import { loadCart } from './cart/action';
import Admin from './pages/Admin';
import EditItem from './pages/EditItem';


function App() {
  // const cartLoaded = useAppSelector(state => state.cart.loading)
  // const cartCount = useAppSelector(state => state.cart.item_ids)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <Menu />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/user' element={<User />}></Route>
        <Route path='/user/setting' element={<UserSetting />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
        <Route path='/user/order' element={<UserOrder />}></Route>
        <Route path='/collection/:id' element={<Collection />}></Route>
        <Route path='/editItem/:id' element={<EditItem />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/checkout' element={<CheckOut />}></Route>
        <Route path='/payment/:id' element={<Payment />}></Route>
        <Route path='/test' element={<Test />}></Route>
        <Route path='/aboutUs' element={<AboutUs />}></Route>
        <Route path='/aboutFlower' element={<AboutFlower />}></Route>
        <Route path='/guide' element={<Guide />}></Route>
        <Route path='/shipping' element={<Shipping />}></Route>
        <Route path='/why' element={<WhyUs />}></Route>
        <Route path='/customization' element={<Customization />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
