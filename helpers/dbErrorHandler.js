"use strict";
/** 
 get unique error field name

*/

const uniqueMessage = error =>{
    let output; 
    try{
        let fieldName = error.message.substring(
            error.message.lastIndexof(".$")+2,
            error.message.lastIndexof("_1")
        );
        output = 
            fieldName.charAt(0).toUpperCase()+
            fieldName.slice(1)+
            "already exists";
    } catch(ex){
        output = "Unique Field already Exist";
    }
    return output;
}


/**
 * @param object
 * Get the eoorors message from the error object
 */
exports.errorHandler = error =>{
    let message = "";

    if(error.code){
        switch(error.code){
        case 11000:
        case 11001:
            message = uniqueMessage(error);
            break;
        default:
            message = "something went wrong";
    }
} else{
    for(let errorName in error.errorors){
        if(error.errorors[errorName].message)
            message = error.errorors[errorName].message;
    }
}

return message;
}