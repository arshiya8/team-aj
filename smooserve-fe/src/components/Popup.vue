<template>
    <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- Your form content here -->
                    <form class="row g-3" id="userDetailsForm">
                        <!-- Your form fields -->
                        <div class="col-lg-6">
                            <label for="profilePicture" class="form-label">Profile Picture:</label>
                            <input type="file" class="form-control" id="profilePicture" accept="image/*"
                                @change="handleProfilePictureChange" />
                            <img :src="profilePicture" class="circular-crop" alt="Profile Picture" />
                        </div>
                        <div class="col-lg-6">
                            <label for="name" class="form-label">Name:</label>
                            <input v-model="first_name" type="text" class="form-control" id="name1" required />
                        </div>
                        <div class="col-lg-6">
                            <label for="contact" class="form-label">Contact Number:</label>
                            <input v-model="contact" type="tel" class="form-control" id="contact" required />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <Button label="Close" data-bs-dismiss="modal"></Button>
                    <Button label="Update Profile" @click="updateProfile"></Button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    methods: {
        async updateProfile() {
            try {
                const response = await axios.put(`http://localhost:8080/api/student/${studentId}`, {
                    first_name: first_name.value,
                    email: email.value,
                    contact: contact.value,
                });
                console.log(response.data); // Handle the response from the server if needed
                localStorage.setItem('userProfile', JSON.stringify({
                    first_name: first_name.value,
                    email: email.value,
                    contact: contact.value,
                }));
                editMode.value = false;
            } catch (error) {
                console.error(error);
                // Handle errors if the update fails
            }
        },
        handleProfilePictureChange(event) {
            const file = event.target.files[0];
            if (file) {
                profilePicture.value = URL.createObjectURL(file);
            }
        }
    }
};
</script>