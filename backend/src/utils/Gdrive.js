import { google } from "googleapis";
import fs from "fs";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const Oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

Oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: Oauth2client
})

export async function createFolder(folderName) {
    const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
    };
    try {
        const response = await drive.files.create({
            resource: folderMetadata,
            fields: 'id',
        });
        return response.data.id; // Return the ID of the created folder
    } catch (error) {
        console.error('Error creating folder:', error);
    }
}

export async function uploadFileToFolder(folderId, filePath, mimeType) {
    const fileName = filePath.split('\\').pop(); // Extracts the file name from the path

    const fileMetadata = {
        name: fileName, // Set the desired file name here
        parents: [folderId] // Specify the folder ID
    };

    const media = {
        mimeType: mimeType, // Set the MIME type
        body: fs.createReadStream(filePath) // Read the file stream
    };

    try {
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id' // Specify the fields to return
        });
        console.log(`File uploaded successfully with ID: ${response.data.id}`);
        return response.data.id; // Return the uploaded file's ID
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error; // Rethrow the error for further handling
    }
}