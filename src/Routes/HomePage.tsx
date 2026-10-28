import { useEffect } from 'react'
import { useLocation } from 'react-router'
import './HomePage.css'
import {TopNav} from '../Components/TopNav'
import {AboutShax} from '../Components/AboutShax'
import {PlayGame} from '../Components/PlayGame'




export default function HomePage(){

    const location = useLocation();

    // Scroll to the section named in the URL hash (e.g. /#play-game), including when arriving from another page.
    useEffect(() => {
        if (!location.hash) return;
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }, [location.hash, location.key]);

    return <>
        <TopNav></TopNav>
        <AboutShax></AboutShax>
        <PlayGame></PlayGame>

    </>
}
