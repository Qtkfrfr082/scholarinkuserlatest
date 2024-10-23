import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import '../Css/Home.css';
import TopBar from '../Js/TopBar.jsx';
import RecommendedFY from '../Js/Recommended.jsx';
import Categories from '../Js/Categories.jsx'

function Home() {



    return(
        <div className='container-Home w-full'>
             <TopBar />
             <div className='RecomText'>Recommended For You</div>
             <RecommendedFY />
             <div className='Sall'>See all</div>
            
             <Categories />
    </div>
  );
};
     
   
export default Home;
