

const catchError = (err,req,res,next)=>{

    const statusCode = err.statusCode? err.statusCode: 500;

    errorStatus = `${err.statusCode}`.startsWith('4') ? 'fail' : 'error';

    console.log(err.lineNumber)
    console.log(err)
    
    res.json({message:err.message,
    statusCode: err.statusCode,statusCode})

}

module.exports = {catchError}