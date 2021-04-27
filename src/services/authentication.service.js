import axios from 'axios'
// import jsonp from 'jsonp'

import {API_URL} from '../utils/constans'

export const authenticate = async (token) => {
    // var target = document.getElementsByTagName('script')[0] || document.head
    // let script = document.createElement('script')
    // script.type = 'text/javascript'
    // script.src = `${API_URL}/${token}?callback=parseJson`
    // target.parentNode.insertBefore(script, target)
    // target.parentNode.insertBefore(script, target);
    // jsonp(`${API_URL}/${token}`, null, (err, data) => {
    //     console.log('works!')
    //     // if (err) {
    //     //     console.log('error: ', err)
    //     // } else {
    //     //     console.log(data)
    //     // }
    // })

    const result = await axios
        .get(`${API_URL}/${token}`)
        .then((response) => {
            console.log(response)
            return response.data
        })
        .catch((error) => {
            console.log(error)
            return false
        })
    return result
    
    // hardcoded authentication
    // return token === '6231704af5b7' ? true : false;
    
}
