import {useNavigate} from 'react-router'
// 2. Use it anywhere in your app like this
import { api } from '../services/api';
import axios from 'axios'
import './HomePage.css'
import {TopNav} from '../Components/TopNav'
import {AboutShax} from '../Components/AboutShax'
import {PlayGame} from '../Components/PlayGame'




export default function HomePage(){

    

    return <>
        <TopNav></TopNav>
        <AboutShax></AboutShax>
        <PlayGame></PlayGame>
        
    </>
}
