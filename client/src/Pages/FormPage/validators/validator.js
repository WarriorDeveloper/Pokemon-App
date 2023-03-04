export const validatorName = (str)=>{
    if (str === '') {
        console.log('vacio')
        return false
    }
    return /^[a-z]*[A-Z]*$/.test(str)
}

/**
 * 
 * @param {number} int 
 */
export const validatorStats = (int)=>{
    if(int<0) return false
    if(int>1000) return false
    return true
}

/**
 * 
 * @param {{
 * name: string,
 * image: string,
 * hp: number,
 * attack: number,
 * defense: number,
 * speed: number,
 * height: number,
 * weight: number,
 * types: any[]
 * }} pokemon 
 */
export const validatorPokemon = (pokemon)=>{
    for(const prop in pokemon){
        if(prop === 'types'){
            if (pokemon[prop].length === 0) return false
          }
        if (!pokemon[prop]) return false
    }
    return true
}