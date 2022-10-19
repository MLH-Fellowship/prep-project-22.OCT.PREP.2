

const Items = (props) => {
    let weather_items= {
        "Clear" : ["sunglasses", "sunscreen"],  
    
        "Rain"          : ["umbrella", "coat"] , 
        "Drizzle"       : ["umbrella", "coat"] , 
        "Clouds"        : ["umbrella" , "coat"],
        "Snow"          : ["coat" , "umbrella"], 
    
    
        "Tornado"       : ["flashlight" ,"firstaid"], 
        "Thunderstorm"  : ["first-aid" , "cannedfood"], 
    
        "Squall"        : ["goggles" , "mask"], 
        "Ash"           : ["goggles" , "mask"], 
        "Dust"          : ["goggles" , "mask"], 
        "Smoke"         : ["goggles" , "mask"], 
        "Haze"          : ["goggles" , "mask"], 
        "Fog"           : ["goggles" , "mask"], 
        "Mist"          : ["goggles" , "mask"], 
        "Sand"          : ["goggles" , "mask"],
    
    } ; 
    const k = props.ok ;
    console.log(`key is ${k}`);
    return (  
        <div className="Items-to-bring"> 
            <h2> Items you should bring </h2>
        <div className="Items-box"> 
            {
            weather_items[k].map((item)=> (
            <img className="item" key={item}  src={ require (`./assets/${item}.png`).default} alt={`${item}`}/>  
            )) }  
            </div>   
        </div>
    );
}
 
export default Items;