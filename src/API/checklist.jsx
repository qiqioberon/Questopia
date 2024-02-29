
const baseURL = "https://oprec-api.labse.in/api"
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ4MDdlMjJhYmNjOTBhNGM2N2IzY2EiLCJpYXQiOjE3MDg2NTc3NzcsImV4cCI6MTcxMTI0OTc3N30.tjc17lT_dQhivAMjF_YrGEhxwy5lRB-pGh_LeVRh5fo';

export const UpdateChecklist = async (checklistItem, isDone, idChecklist, idTask) => {
    try {
        const response = await fetch(`${baseURL}/task/${idTask}/checklist/${idChecklist}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                checklistItem: checklistItem,
                isDone: isDone
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


export const CreateChecklist = async (checklistItem, idTask) => {
    try {
        const response = await fetch(`${baseURL}/task/${idTask}/checklist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(
                [
                    {
                        checklistItem: checklistItem,
                        isDone: false
                    }
                ]
            )
        });
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}

export const deleteChecklist = async (idTask, idchecklist) => {
    try {
        const response = await fetch(`${baseURL}/task/${idTask}/checklist/${idchecklist}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(

            )
        });
        const data = await response.json();
        console.log(data);
        return data;
        // Lakukan penanganan respons dari API di sini, seperti menangani token, pesan kesalahan, dll.
    } catch (error) {
        throw error;
    }
}