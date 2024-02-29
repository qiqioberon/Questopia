
const baseURL = "https://oprec-api.labse.in/api"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4MDdlMjJhYmNjOTBhNGM2N2IzY2EiLCJpYXQiOjE3MDg2NTc3NzcsImV4cCI6MTcxMTI0OTc3N30.tjc17lT_dQhivAMjF_YrGEhxwy5lRB-pGh_LeVRh5fo';

export const createAttachment = async (judul, link, idTask) => {
    try {
        const response = await fetch(`${baseURL}/task/${idTask}/attachment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                [{
                    link: link,
                    displayText: judul
                }]
            )
        }
        );
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}

export const updateAttachment = async (judul, link, idTask, idAttachment) => {
    try {
        const response = await fetch(`${baseURL}/task/${idTask}/attachment/${idAttachment}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                {
                    link: link,
                    displayText: judul
                }
            )
        }
        );
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}

export const deleteAttachment = async (idTask, idAttachment) => {
    try {
        const response = await fetch(`${baseURL}/task/${idTask}/attachment/${idAttachment}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        }
        );
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}