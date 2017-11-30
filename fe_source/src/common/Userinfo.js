import 'whatwg-fetch';
import Apiconfig from './Apiconfig';

export default class Userinfo{
    constructor(id){
        this.id = id;
    }
    info(func){
        fetch(new Apiconfig().apiUrl+"users/info?id="+this.id)
            .then((res)=>{return res.json()})
            .then((json)=>{
                return func(json);
            })
            .catch((err)=>{
                console.log('err :' + err);
            });
    }
}