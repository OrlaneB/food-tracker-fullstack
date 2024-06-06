
const mod = ()=>{
  import axios from 'axios'
  axios.get('https://api.nal.usda.gov/fdc/v1/foods/', {
    
    params:{query:'cheddar cheese'}

}).then(function(response){console.log(response.data)})
  .catch(function(error){console.log(error.error)}
);
}

mod();
