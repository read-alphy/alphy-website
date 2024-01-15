
import axios from 'axios';
import { API_URL } from '../constants';


export default async function updateUserMetadata(idToken, newMetadata){

    
    

        try{
                axios.post(`${API_URL}/fe-metadata`, newMetadata, {
                    
                    headers: {
                        'id-token': idToken,
                    },

                }).then((response) => {
                    console.log(response.data)
                    return response.data
                })
            }
            catch(error){
                console.error('Error in updateUserMetadata:', error)
                return null
            }



}


