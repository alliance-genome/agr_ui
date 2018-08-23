class ApolloService 
{
    /*
    * ApolloService Class
    * 
    */
    constructor(){ }

    GetIsoformTrack(url){
        return new Promise((resolve, reject) =>{
            fetch(url).then((response) => {
                resolve(response.json())
            }).catch(error => {
                reject(error);
            })
        });
    }
}

export { ApolloService }