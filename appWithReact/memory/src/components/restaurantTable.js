import React from 'react';
import '../App.css';



export default function RestaurantTable(props){

	return (
	<table id="restaurants" >
      <thead>
      <tr>
        <th>
	        <button class="sort_button" onClick={() => props.sortByString('name')}>
				Name
			</button>
        </th>
        <th>
        	<button class="sort_button" onClick={() => props.sortByString('street')}>
				Adress
			</button>
        </th>
        <th>
	        <button class="sort_button" onClick={() => props.sortBy('postal_code')}>
				Postal code
			</button>
			
		</th>
        <th>
	        <button class="sort_button" onClick={() => props.sortByString('city')}>
				City
			</button>
		</th>
        <th>
	        <button class="sort_button" onClick={() => props.sortByString('type')}>
				Type
			</button>
		</th>
        <th>
        	<button class="sort_button" onClick={() => props.sortByString('comfort_level')}>
				Comfort Level
			</button>
		</th> 
        <th>
        	<button class="sort_button" onClick={() => props.sortByString('tel')}>
				Tel
			</button>
        </th>
      
        <th>
        <button class="sort_button" onClick={() => props.sortByString('website')}>
				Website
			</button></th>
            <th>
                Feedback
            </th>
      </tr>
      
      </thead>
      <tbody>
        {props.data.map((item, index)=> { 
        return  <tr>
          <th>{item.name}</th>
          <th>{item.street} </th>
          <th>{item.postal_code}</th>
          <th>{item.city}</th>
          <th>{item.type}</th>
          <th>{item.comfort_level}</th>
          <th>{item.tel}</th>
          <th>{item.website}</th>
          <th>{item.feedback}</th>

        </tr>
      })}   
      </tbody>
      </table>
    )
}