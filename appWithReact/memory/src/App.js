import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/MaitresBibRestaurants.json';
import RestaurantTable from './components/restaurantTable.js';
import bib from './data/bib.jpg';
import maitre from './data/maitre.jpg';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      data:data
      ,
      direction: {
        postal_code: 'asc',
        name: 'asc',
      }
    }
    this.sortBy=this.sortBy.bind(this)
    this.sortByString=this.sortByString.bind(this)
  }


  sortByString(key){
    this.setState({
        data: data.sort( (a,b)=> 
   


          this.state.direction[key] === 'asc'
            ?  ( ((a[key])<(b[key])) ? (-1) : (1) )
            :  ( ((b[key])<(a[key])) ? (-1) : (1) )
          

        ),
        direction : {
          [key]: this.state.direction[key] === 'asc'
            ? 'desc'
            : 'asc'
        }
    })

  }

  sortBy(key){

    this.setState({
        data: data.sort( (a,b)=> 
     


          this.state.direction[key] === 'asc'
            ?  (parseFloat(a[key])-parseFloat(b[key]))
            :  (parseFloat(b[key])-parseFloat(a[key]))
          

        ),
        direction : {
          [key]: this.state.direction[key] === 'asc'
            ? 'desc'
            : 'asc'
        }
    })

  }

  render () {
    return (

      <div className="global" >
        <center><div className="logo">
          <img
            alt="Michelin"
            src={bib}
            className="logo_michelin"
          />
                    <img
            alt="Maitre Restaurateur"
            src={maitre}
            className="logo_maitre"
          />
        </div>          </center>

      <h1 class="title"> Restaurants (click on the title of the column to sort by the column selected)</h1>
      
      < RestaurantTable 
          data={this.state.data}
          sortBy={this.sortBy}
          sortByString={this.sortByString}
       />
      </div>
    );
  }

}

export default App;