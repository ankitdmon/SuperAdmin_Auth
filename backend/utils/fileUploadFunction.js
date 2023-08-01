module.exports.getFileURL=(request)=>{
    if (request.file) {
        const fileDestination=request.file.path.replace('\\','/').replace('\\','/');
        
        let staticFolderNameLength=fileDestination.split('/')[0].length+1;  //get static path length for remove it.

        const finalPath=fileDestination.substr(staticFolderNameLength,fileDestination.length-1)  //remove static path

        const URL=`${request.protocol}://${request.get('host')}/${finalPath}` //final URL
        console.log('file uploaded',URL)
          return URL
    }else{
        return ''
    }
}

