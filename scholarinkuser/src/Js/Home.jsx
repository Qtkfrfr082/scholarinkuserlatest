import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import '../Css/Home.css';
import TopBar from '../Js/TopBar.jsx';
import RecommendedFY from '../Js/Recommended.jsx';

function Home() {



    return(
        <div className='container-Home'>
             <TopBar />
             <div className='RecomText'>Recommended For You</div>
             <RecommendedFY />
    </div>
  );
};
     
   
export default Home;
