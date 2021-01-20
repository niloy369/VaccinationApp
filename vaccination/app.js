const AWS = require('aws-sdk')
const dynamoDB = AWS.DynamoDB.DocumentClient({
    region: 'us-east-2'
});

const vaccinationTable = process.env.VaccinationTable;

exports.postForm = async (event, context) => {

    const vaccinationForm = JSON.parse(event.body)

    const vaccination = {
        id: context.awsRequestId,
        firstName: vaccinationForm.firstName,
        middle: vaccination.middle,
        lastname: vaccination.lastname,
        address: vaccination.address,
        address2: vaccination.address2,
        city: vaccination.city,
        dob: vaccination.dob,
        state: vaccination.state,
        zip: vaccination.zip,
        country: vaccination.country,
        worker: vaccination.worker,
        healthcar: vaccination.healthcar,
        covid: vaccination.covid
    }

    let response;

    dynamoDB.put({
        TableName: vaccinationTable,
        Item: vaccination
    }).promise().then(() => {
        response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify("Vacciantion Form Successfully Submitted!")
        }
    }).catch((err) => {
        response = {
            body: JSON.stringify("Could Not Submit Your Form!")
        }
    });

    return response
};
