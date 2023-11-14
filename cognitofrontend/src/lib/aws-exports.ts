const awsExports = {
   
    "Auth": {
        "region": "us-east-1",
        "userPoolId": process.env.NEXT_PUBLIC_ID,
        "userPoolWebClientId": process.env.NEXT_PUBLIC_CLIENT_ID
    }
};


export default awsExports;