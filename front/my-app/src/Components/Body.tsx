import React, { useEffect, useRef, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';
import { useAppDispatch } from '../store';
import { login } from '../auth/action';
import SellingItems from './Items';
import { loadCart } from '../cart/action';
import { useNavigate } from 'react-router-dom';



export default function Body() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token != null) {
            dispatch(login(token));
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(loadCart());
      }, [dispatch])


    const [Bouquet, setBouquet] = useState([]);
    const [Dome, setDome] = useState([]);
    const [Boxes, setBoxes] = useState([]);
    const [Bluetooth, setBluetooth] = useState([]);
    const [Fantasy, setFantasy] = useState([]);
    const [Bear, setBear] = useState([]);

    // const loggedUsername = useSelector((state: RootState) => state.auth.username)



    async function typeOne() {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/1`);
        let response = await res.json();

        setBouquet(response);
    }

    async function typeTwo() {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/2`);
        let response = await res.json();

        setDome(response);
    }

    async function typeThree() {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/3`);
        let response = await res.json();

        setBoxes(response);
    }

    async function typeFour() {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/4`);
        let response = await res.json();

        setBluetooth(response);
    }

    async function typeFive() {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/5`);
        let response = await res.json();

        setFantasy(response);
    }

    async function typeSix() {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/6`);
        let response = await res.json();

        setBear(response);
    }



    useEffect(() => {
        typeOne()
        typeTwo()
        typeThree()
        typeFour()
        typeFive()
        typeSix()
    }, [])


    const preservedFlowerBouquet = useRef(null);
    const glassDome = useRef(null);
    const flowerBoxes = useRef(null);
    const blueToothSpeaker = useRef(null);
    const fantasy = useRef(null);
    const roseBear = useRef(null);

    return (
        <div className="body">
            <div>
                <Splide className="slideShow" options={{ type: 'loop', autoplay: true, interval: 5000,rewind: true, autoWidth: true, focus: 'center', arrows: false }} aria-label="Slide show">
                    <SplideSlide className="item">
                        <img className="item" src={require('../splide_img4.jpeg')} alt="Beautiful flower" />
                        <h3 className="promotionText">Wanna show respect to your seniors?</h3>
                        <button className="promotionButton" onClick={() => navigate('/collection/1')}>Senior Citizen&apos;s Day</button>
                    </SplideSlide>
                    <SplideSlide className="item">
                        <img className="item" src={require('../splide_img5.jpeg')} alt="Flower in the garden" />
                        <h3 className="promotionText">It&apos;s Valentines Day!</h3>
                        <button className="promotionButton" onClick={() => navigate('/collection/6')}>To your lover</button>
                    </SplideSlide>
                    <SplideSlide className="item">
                        <img className="item" src={require('../splide_img6.jpeg')} alt="Angel flower" />
                        <h3 className="promotionText">Happy Lunar New Year!</h3>
                        <button className="promotionButton" onClick={() => navigate('/collection/3')}>Relatives options</button>
                    </SplideSlide>
                    <div className="splide__progress">
                        <div className="splide__progress__bar" />
                    </div>
                </Splide>
            </div>
            <div ref={preservedFlowerBouquet} key='PRESERVED FLOWER BOUQUET'>
                <h2><span>BOUQUET</span></h2>
                <div className="container p-3">
                    <div className="row d-flex flex-wrap justify-content-around">
                        {
                            Bouquet.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={glassDome} key='GLASS DOME'>
                <h2><span>GLASS DOME</span></h2>
                <div className="container p-3">
                    <div className="row d-flex flex-wrap justify-content-around">
                        {
                            Dome.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={flowerBoxes} key='FLOWER BOXES'>
                <h2><span>FLOWER BOXES</span></h2>
                <div className="container p-3">
                    <div className="row d-flex flex-wrap justify-content-around">
                        {
                            Boxes.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={blueToothSpeaker} key='BLUETOOTH SPEAKER'>
                <h2><span>BLUETOOTH SPEAKER</span></h2>
                <div className="container p-3">
                    <div className="row d-flex flex-wrap justify-content-around">
                        {
                            Bluetooth.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={fantasy} key='FANTASY'>
                <h2><span>FANTASY</span></h2>
                <div className="container p-3">
                    <div className="row d-flex flex-wrap justify-content-around">
                        {
                            Fantasy.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={roseBear} key='ROSE BEAR'>
                <h2><span>ROSE BEAR</span></h2>
                <div className="container p-3">
                    <div className="row d-flex flex-wrap justify-content-around">
                        {
                            Bear.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}