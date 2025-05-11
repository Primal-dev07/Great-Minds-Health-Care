<template>
  <div class="profile-page">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 mb-4">
          <div class="profile-sidebar">
            <div class="profile-image">
              <img src="https://via.placeholder.com/150" alt="Profile Image" class="img-fluid rounded-circle">
              <button class="btn btn-sm btn-light change-photo-btn">
                <i class="fa fa-camera"></i> Change Photo
              </button>
            </div>

            <div class="profile-info">
              <h2>{{ currentUser.firstName }} {{ currentUser.lastName }}</h2>
              <p class="text-muted">{{ currentUser.email }}</p>
              <p class="patient-id">Patient ID: {{ currentUser.patientId || 'GMHC-12345' }}</p>
            </div>

            <div class="profile-menu">
              <button
                class="menu-item"
                :class="{ active: activeTab === 'personal' }"
                @click="activeTab = 'personal'"
              >
                <i class="fa fa-user"></i> Personal Information
              </button>
              <button
                class="menu-item"
                :class="{ active: activeTab === 'medical' }"
                @click="activeTab = 'medical'"
              >
                <i class="fa fa-heartbeat"></i> Medical Information
              </button>
              <button
                class="menu-item"
                :class="{ active: activeTab === 'security' }"
                @click="activeTab = 'security'"
              >
                <i class="fa fa-lock"></i> Security Settings
              </button>
              <button
                class="menu-item"
                :class="{ active: activeTab === 'notifications' }"
                @click="activeTab = 'notifications'"
              >
                <i class="fa fa-bell"></i> Notification Preferences
              </button>
            </div>
          </div>
        </div>

        <div class="col-lg-8">
          <div class="profile-content">
            <!-- Personal Information Tab -->
            <div v-if="activeTab === 'personal'" class="tab-content">
              <div class="content-header">
                <h2>Personal Information</h2>
                <p>Update your personal details and contact information</p>
              </div>

              <form @submit.prevent="updatePersonalInfo">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName" class="form-label">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      v-model="personalInfo.firstName"
                      required
                    >
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      v-model="personalInfo.lastName"
                      required
                    >
                  </div>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="personalInfo.email"
                    required
                  >
                </div>

                <div class="mb-3">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    v-model="personalInfo.phone"
                  >
                </div>

                <div class="mb-3">
                  <label for="address" class="form-label">Address</label>
                  <textarea
                    class="form-control"
                    id="address"
                    rows="3"
                    v-model="personalInfo.address"
                  ></textarea>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="dateOfBirth" class="form-label">Date of Birth</label>
                    <input
                      type="date"
                      class="form-control"
                      id="dateOfBirth"
                      v-model="personalInfo.dateOfBirth"
                    >
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="gender" class="form-label">Gender</label>
                    <select
                      class="form-select"
                      id="gender"
                      v-model="personalInfo.gender"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div class="mb-3">
                  <label for="emergencyContact" class="form-label">Emergency Contact</label>
                  <input
                    type="text"
                    class="form-control"
                    id="emergencyContact"
                    v-model="personalInfo.emergencyContact"
                    placeholder="Name and phone number"
                  >
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Medical Information Tab -->
            <div v-else-if="activeTab === 'medical'" class="tab-content">
              <div class="content-header">
                <h2>Medical Information</h2>
                <p>Update your medical history and health information</p>
              </div>

              <form @submit.prevent="updateMedicalInfo">
                <div class="mb-3">
                  <label for="bloodType" class="form-label">Blood Type</label>
                  <select
                    class="form-select"
                    id="bloodType"
                    v-model="medicalInfo.bloodType"
                  >
                    <option value="">Select Blood Type</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="allergies" class="form-label">Allergies</label>
                  <textarea
                    class="form-control"
                    id="allergies"
                    rows="3"
                    v-model="medicalInfo.allergies"
                    placeholder="List any allergies you have"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="medications" class="form-label">Current Medications</label>
                  <textarea
                    class="form-control"
                    id="medications"
                    rows="3"
                    v-model="medicalInfo.medications"
                    placeholder="List any medications you are currently taking"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="conditions" class="form-label">Medical Conditions</label>
                  <textarea
                    class="form-control"
                    id="conditions"
                    rows="3"
                    v-model="medicalInfo.conditions"
                    placeholder="List any chronic conditions or past surgeries"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="familyHistory" class="form-label">Family Medical History</label>
                  <textarea
                    class="form-control"
                    id="familyHistory"
                    rows="3"
                    v-model="medicalInfo.familyHistory"
                    placeholder="List any relevant family medical history"
                  ></textarea>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Security Settings Tab -->
            <div v-else-if="activeTab === 'security'" class="tab-content">
              <div class="content-header">
                <h2>Security Settings</h2>
                <p>Update your password and security preferences</p>
              </div>

              <form @submit.prevent="updatePassword">
                <div class="mb-3">
                  <label for="currentPassword" class="form-label">Current Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="currentPassword"
                    v-model="securityInfo.currentPassword"
                    required
                  >
                </div>

                <div class="mb-3">
                  <label for="newPassword" class="form-label">New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="newPassword"
                    v-model="securityInfo.newPassword"
                    required
                  >
                </div>

                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="securityInfo.confirmPassword"
                    required
                  >
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Updating...' : 'Update Password' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Notification Preferences Tab -->
            <div v-else-if="activeTab === 'notifications'" class="tab-content">
              <div class="content-header">
                <h2>Notification Preferences</h2>
                <p>Manage how you receive notifications from us</p>
              </div>

              <form @submit.prevent="updateNotificationPreferences">
                <div class="mb-3">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="emailNotifications"
                      v-model="notificationPreferences.email"
                    >
                    <label class="form-check-label" for="emailNotifications">
                      Email Notifications
                    </label>
                  </div>
                  <div class="form-text">Receive appointment reminders and updates via email</div>
                </div>

                <div class="mb-3">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="smsNotifications"
                      v-model="notificationPreferences.sms"
                    >
                    <label class="form-check-label" for="smsNotifications">
                      SMS Notifications
                    </label>
                  </div>
                  <div class="form-text">Receive appointment reminders and updates via SMS</div>
                </div>

                <div class="mb-3">
                  <div class="form-check form-switch">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="marketingEmails"
                      v-model="notificationPreferences.marketing"
                    >
                    <label class="form-check-label" for="marketingEmails">
                      Marketing Emails
                    </label>
                  </div>
                  <div class="form-text">Receive newsletters and promotional offers</div>
                </div>

                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {{ loading ? 'Saving...' : 'Save Preferences' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProfileView',
  data() {
    return {
      activeTab: 'personal',
      loading: false,
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        emergencyContact: ''
      },
      medicalInfo: {
        bloodType: '',
        allergies: '',
        medications: '',
        conditions: '',
        familyHistory: ''
      },
      securityInfo: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      notificationPreferences: {
        email: true,
        sms: true,
        marketing: false
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/currentUser',
      isAuthenticated: 'auth/isAuthenticated'
    }),
    currentUser() {
      // If we have a user from auth store, use it, otherwise use the mock data
      if (this.user) {
        return {
          firstName: this.user.name ? this.user.name.split(' ')[0] : 'Demo',
          lastName: this.user.name ? this.user.name.split(' ')[1] || '' : 'User',
          email: this.user.email || 'demo@example.com',
          phone: this.user.phone || '+1234567890',
          address: this.user.address ? this.user.address.street + ', ' + this.user.address.city : '123 Main St, Anytown',
          dateOfBirth: this.user.dateOfBirth || '1990-01-01',
          gender: this.user.gender || 'male',
          emergencyContact: 'Jane Doe: +1987654321',
          patientId: 'GMHC-' + (Math.floor(Math.random() * 90000) + 10000)
        };
      }

      // Fallback to mock data
      return {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com',
        phone: '+1234567890',
        address: '123 Main St, Anytown',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        emergencyContact: 'Jane Doe: +1987654321',
        patientId: 'GMHC-' + (Math.floor(Math.random() * 90000) + 10000)
      };
    }
  },
  methods: {
    ...mapActions({
      updateProfileAction: 'auth/updateProfile',
      updatePasswordAction: 'auth/updatePassword'
    }),
    updatePersonalInfo() {
      this.loading = true

      // For demo purposes, simulate API call
      setTimeout(() => {
        console.log('Updating personal info:', this.personalInfo);

        // In a real app, we would call the updateProfileAction
        // this.updateProfileAction(this.personalInfo);

        this.loading = false;
        // Show success message
        alert('Personal information updated successfully!');
      }, 1000);
    },
    updateMedicalInfo() {
      this.loading = true

      // For demo purposes, simulate API call
      setTimeout(() => {
        console.log('Updating medical info:', this.medicalInfo);

        // In a real app, we would call an API to update medical info

        this.loading = false;
        // Show success message
        alert('Medical information updated successfully!');
      }, 1000);
    },
    updatePassword() {
      if (this.securityInfo.newPassword !== this.securityInfo.confirmPassword) {
        alert('New passwords do not match!');
        return;
      }

      this.loading = true;

      // For demo purposes, simulate API call
      setTimeout(() => {
        console.log('Updating password');

        // In a real app, we would call the updatePasswordAction
        // this.updatePasswordAction({
        //   currentPassword: this.securityInfo.currentPassword,
        //   newPassword: this.securityInfo.newPassword
        // });

        this.loading = false;
        // Show success message
        alert('Password updated successfully!');
        this.securityInfo = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };
      }, 1000);
    },
    updateNotificationPreferences() {
      this.loading = true;

      // For demo purposes, simulate API call
      setTimeout(() => {
        console.log('Updating notification preferences:', this.notificationPreferences);

        // In a real app, we would call an API to update notification preferences

        this.loading = false;
        // Show success message
        alert('Notification preferences updated successfully!');
      }, 1000);
    }
  },
  created() {
    // Populate form with user data
    this.personalInfo = {
      firstName: this.currentUser.firstName || '',
      lastName: this.currentUser.lastName || '',
      email: this.currentUser.email || '',
      phone: this.currentUser.phone || '',
      address: this.currentUser.address || '',
      dateOfBirth: this.currentUser.dateOfBirth || '',
      gender: this.currentUser.gender || '',
      emergencyContact: this.currentUser.emergencyContact || ''
    };

    // Populate medical info with mock data for demo
    this.medicalInfo = {
      bloodType: 'O+',
      allergies: 'Penicillin, Peanuts',
      medications: 'Lisinopril 10mg daily, Atorvastatin 20mg daily',
      conditions: 'Hypertension, High Cholesterol',
      familyHistory: 'Father: Diabetes, Mother: Hypertension'
    };
  }
}
</script>

<style scoped>
.profile-page {
  padding: 60px 0;
}

.profile-sidebar {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  text-align: center;
}

.profile-image {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 20px;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 5px solid #f8f9fa;
}

.change-photo-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.profile-info {
  margin-bottom: 30px;
}

.profile-info h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.patient-id {
  display: inline-block;
  background-color: #f8f9fa;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #666;
  margin-top: 10px;
}

.profile-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  text-align: left;
  font-weight: 500;
  color: #666;
  transition: all 0.3s;
}

.menu-item i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.menu-item:hover {
  background-color: #f8f9fa;
  color: #007bff;
}

.menu-item.active {
  background-color: #e1ddf0;
  color: #007bff;
}

.profile-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  height: 100%;
}

.content-header {
  margin-bottom: 30px;
}

.content-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.content-header p {
  color: #666;
}

.form-control, .form-select {
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: all 0.3s;
}

.form-control:focus, .form-select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background: linear-gradient(120deg, #007bff, #170752);
  border: none;
  border-radius: 8px;
  padding: 10px 25px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.2);
}

@media (max-width: 992px) {
  .profile-sidebar {
    margin-bottom: 30px;
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 40px 0;
  }
}
</style>
