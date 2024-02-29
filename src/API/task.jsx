
const baseURL = "https://oprec-api.labse.in/api"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4MDdlMjJhYmNjOTBhNGM2N2IzY2EiLCJpYXQiOjE3MDg2NTc3NzcsImV4cCI6MTcxMTI0OTc3N30.tjc17lT_dQhivAMjF_YrGEhxwy5lRB-pGh_LeVRh5fo';


export const CreateTask = async (judul) => {
    try {
        const response = await fetch(`${baseURL}/task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: judul,
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


export const UpdateTaskTitle = async (title, id) => {
    try {
        const response = await fetch(`${baseURL}/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: title,
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

export const UpdateTaskDescription = async (description, id) => {
    try {
        const response = await fetch(`${baseURL}/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                description: description,
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

export const UpdateTaskDueDate = async (dueDate, id) => {
    try {
        const response = await fetch(`${baseURL}/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                dueDate: dueDate,
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

export const UpdateTaskTags = async (tags, id) => {
    try {
        const response = await fetch(`${baseURL}/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                tags: tags,
            })
        });
        const data = await response.json();
        console.log(data);
        console.log(tags, id);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}



export const DeleteTask = async (id) => {
    try {
        const response = await fetch(`${baseURL}/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}

export const GetTask = async () => {
    try {
        const response = await fetch(`${baseURL}/task`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}


// body: JSON.stringify({
//     title: judul,
//     description: deskripsi,
//     dueDate: deadline,
//     tags: tags,
//     checklist: checklist,
//     attachment: attachment
// })