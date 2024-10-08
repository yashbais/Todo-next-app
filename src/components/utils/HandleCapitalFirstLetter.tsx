//  return capital letter of given string
export const handleCapitalFirstLetter = (str: string | null | undefined): string => {
    if (str && str?.length > 0) {
      const splitedStr = str.split(' ')
      if(splitedStr?.length > 1){
        return splitedStr.map(val => val && val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ') 
      }else {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      }
    }
    return ''
  }
  