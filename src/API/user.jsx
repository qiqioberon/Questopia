
const baseURL = "https://oprec-api.labse.in/api"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4MDdlMjJhYmNjOTBhNGM2N2IzY2EiLCJpYXQiOjE3MDg2NTc3NzcsImV4cCI6MTcxMTI0OTc3N30.tjc17lT_dQhivAMjF_YrGEhxwy5lRB-pGh_LeVRh5fo';

export const LoginUser = async (email, password) => {
    try {
        const response = await fetch(`${baseURL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}

export const SignUpUser = async ({ nrp, nama, email, password }) => {
    try {
        const response = await fetch(`${baseURL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: nrp,
                name: nama,
                email: email,
                password: password,
                language: 'en'
            })
        });
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}

export const GetCurrentUser = async () => {
    try {
        const response = await fetch(`${baseURL}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}
