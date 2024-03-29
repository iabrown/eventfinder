import React from 'react';
import unsplash from '../api/unsplash';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import SearchBar from './SearchBar';
import EventList from './EventList';
import Footer from './Footer';

const App = () => {
  const [images,setImages] = React.useState(localStorage.getItem('images') || []);
  const [term, setTerm] = React.useState(localStorage.getItem('term') || "");

  const onSearchSubmit = async (event) => {
    const response = await unsplash.get('/search/photos', {
      params: { query: term }
    });
    setImages(response.data.results);
  }

  const onSetTerm = (event) => {
    setTerm(event.target.value);
  }


  return(
    <div className="container-fluid Main" style={{padding:'0px'}}>
    <ReactScrollWheelHandler  upHandler={(e)=>console.log("scroll up")} downHandler={(e)=>console.log("scroll down")}>

      <SearchBar SearchSubmit={onSearchSubmit} term={term} setTerm={onSetTerm}/>
      <EventList images={images} />

    </ReactScrollWheelHandler>
    <Footer />
    </div>

  )
}


export default App;
