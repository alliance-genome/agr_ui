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

    GetLocalSequence(build, chromosome, start, end){
        let url = "http://demo.genomearchitect.org/Apollo2/sequence/Human-Hg38/chr" + chromosome + ":" + start + ".." + end
        return new Promise((resolve, reject)=>{
            fetch(url).then((response) =>{
                resolve(response.text());
            }).catch(error =>{
                reject(error);
            })
        });
    }

    // Our variant endpoint should take a range on a chromosome
    // and return all the variants that fall within that range
    GetFakeVariants(chromosome, start, end){
        let fakeVariants = [
            {
                "position": 48515449,
                "ref": "G",
                "mutant":"A"
            },
            {
                "position": 48515458,
                "ref": "T",
                "mutant":"C"
            },
            {
                "position": 48515461,
                "ref": "A",
                "mutant":"G"
            },
            {
                "position": 48515500,
                "ref": "C",
                "mutant":"A"
            }
        ]
        return fakeVariants;
    }
}

export { ApolloService }