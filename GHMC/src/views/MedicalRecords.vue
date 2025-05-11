<template>
  <div class="medical-records">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="section-title">
          <h1>My Medical Records</h1>
          <p>Access and manage your health information securely</p>
        </div>
      </div>
    </section>

    <!-- Medical Records Section -->
    <section class="records-section">
      <div class="container">
        <div class="row">
          <!-- Sidebar Navigation -->
          <div class="col-lg-3 mb-4">
            <div class="records-sidebar">
              <div class="user-profile mb-4">
                <div class="avatar">
                  <img :src="userAvatar" alt="User Avatar">
                </div>
                <h3>{{ currentUser.name }}</h3>
                <p class="text-muted">Patient ID: {{ currentUser.patientId }}</p>
              </div>

              <div class="sidebar-menu">
                <button
                  class="menu-item"
                  :class="{ 'active': activeTab === 'summary' }"
                  @click="activeTab = 'summary'"
                >
                  <i class="fas fa-chart-line"></i> Health Summary
                </button>
                <button
                  class="menu-item"
                  :class="{ 'active': activeTab === 'visits' }"
                  @click="activeTab = 'visits'"
                >
                  <i class="fas fa-calendar-check"></i> Visit History
                </button>
                <button
                  class="menu-item"
                  :class="{ 'active': activeTab === 'tests' }"
                  @click="activeTab = 'tests'"
                >
                  <i class="fas fa-vial"></i> Test Results
                </button>
                <button
                  class="menu-item"
                  :class="{ 'active': activeTab === 'prescriptions' }"
                  @click="activeTab = 'prescriptions'"
                >
                  <i class="fas fa-prescription-bottle-alt"></i> Prescriptions
                </button>
                <button
                  class="menu-item"
                  :class="{ 'active': activeTab === 'immunizations' }"
                  @click="activeTab = 'immunizations'"
                >
                  <i class="fas fa-syringe"></i> Immunizations
                </button>
                <button
                  class="menu-item"
                  :class="{ 'active': activeTab === 'documents' }"
                  @click="activeTab = 'documents'"
                >
                  <i class="fas fa-file-medical"></i> Documents
                </button>
              </div>
            </div>
          </div>

          <!-- Main Content Area -->
          <div class="col-lg-9">
            <div class="records-content">
              <!-- Loading State -->
              <div v-if="loading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-3">Loading your medical records...</p>
              </div>

              <!-- Health Summary Tab -->
              <div v-else-if="activeTab === 'summary'" class="tab-content">
                <div class="section-header d-flex justify-content-between align-items-center mb-4">
                  <h2>Health Summary</h2>
                  <button class="btn btn-sm btn-outline-primary">
                    <i class="fas fa-download me-2"></i> Download Summary
                  </button>
                </div>

                <div class="alert alert-info mb-4">
                  <i class="fas fa-info-circle me-2"></i>
                  Your health summary provides an overview of your medical history, current conditions, and key health metrics.
                </div>

                <!-- Vital Statistics -->
                <div class="card mb-4">
                  <div class="card-header">
                    <h3>Vital Statistics</h3>
                    <span class="text-muted">Last updated: {{ formatDate(vitals.lastUpdated) }}</span>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-3 col-6 mb-3">
                        <div class="vital-stat">
                          <div class="vital-icon">
                            <i class="fas fa-weight"></i>
                          </div>
                          <div class="vital-info">
                            <h4>Weight</h4>
                            <p>{{ vitals.weight }} kg</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 col-6 mb-3">
                        <div class="vital-stat">
                          <div class="vital-icon">
                            <i class="fas fa-ruler-vertical"></i>
                          </div>
                          <div class="vital-info">
                            <h4>Height</h4>
                            <p>{{ vitals.height }} cm</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 col-6 mb-3">
                        <div class="vital-stat">
                          <div class="vital-icon">
                            <i class="fas fa-heartbeat"></i>
                          </div>
                          <div class="vital-info">
                            <h4>Blood Pressure</h4>
                            <p>{{ vitals.bloodPressure }}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 col-6 mb-3">
                        <div class="vital-stat">
                          <div class="vital-icon">
                            <i class="fas fa-heart"></i>
                          </div>
                          <div class="vital-info">
                            <h4>Heart Rate</h4>
                            <p>{{ vitals.heartRate }} bpm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Current Conditions -->
                <div class="card mb-4">
                  <div class="card-header">
                    <h3>Current Conditions</h3>
                  </div>
                  <div class="card-body">
                    <div v-if="conditions.length === 0" class="text-center py-3">
                      <p>No current conditions on record.</p>
                    </div>
                    <ul v-else class="condition-list">
                      <li v-for="(condition, index) in conditions" :key="index" class="condition-item">
                        <div class="condition-info">
                          <h4>{{ condition.name }}</h4>
                          <p class="text-muted">Diagnosed: {{ formatDate(condition.diagnosedDate) }}</p>
                          <p>{{ condition.description }}</p>
                        </div>
                        <div class="condition-status" :class="condition.status">
                          {{ condition.status }}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <!-- Allergies -->
                <div class="card mb-4">
                  <div class="card-header">
                    <h3>Allergies</h3>
                  </div>
                  <div class="card-body">
                    <div v-if="allergies.length === 0" class="text-center py-3">
                      <p>No allergies on record.</p>
                    </div>
                    <div v-else class="row">
                      <div v-for="(allergy, index) in allergies" :key="index" class="col-md-4 col-6 mb-3">
                        <div class="allergy-badge" :class="allergy.severity">
                          <i class="fas fa-exclamation-triangle me-2"></i>
                          {{ allergy.name }}
                          <span class="severity-indicator">{{ allergy.severity }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Visit History Tab -->
              <div v-else-if="activeTab === 'visits'" class="tab-content">
                <div class="section-header d-flex justify-content-between align-items-center mb-4">
                  <h2>Visit History</h2>
                  <div>
                    <button class="btn btn-sm btn-outline-primary me-2">
                      <i class="fas fa-filter me-1"></i> Filter
                    </button>
                    <button class="btn btn-sm btn-outline-primary">
                      <i class="fas fa-download me-1"></i> Export
                    </button>
                  </div>
                </div>

                <div v-if="visits.length === 0" class="text-center py-5">
                  <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3>No Visit History</h3>
                    <p>You don't have any recorded visits yet.</p>
                  </div>
                </div>
                <div v-else class="timeline">
                  <div v-for="(visit, index) in visits" :key="index" class="timeline-item">
                    <div class="timeline-date">
                      <div class="date-badge">
                        <span class="month">{{ formatMonth(visit.date) }}</span>
                        <span class="day">{{ formatDay(visit.date) }}</span>
                        <span class="year">{{ formatYear(visit.date) }}</span>
                      </div>
                    </div>
                    <div class="timeline-content">
                      <div class="visit-card">
                        <div class="visit-header">
                          <h3>{{ visit.type }}</h3>
                          <span class="visit-doctor">Dr. {{ visit.doctor }}</span>
                        </div>
                        <div class="visit-details">
                          <p><strong>Reason:</strong> {{ visit.reason }}</p>
                          <p><strong>Diagnosis:</strong> {{ visit.diagnosis }}</p>
                          <p><strong>Notes:</strong> {{ visit.notes }}</p>
                        </div>
                        <div class="visit-actions">
                          <button class="btn btn-sm btn-outline-primary">
                            <i class="fas fa-file-alt me-1"></i> View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Test Results Tab -->
              <div v-else-if="activeTab === 'tests'" class="tab-content">
                <div class="section-header d-flex justify-content-between align-items-center mb-4">
                  <h2>Test Results</h2>
                  <div>
                    <button class="btn btn-sm btn-outline-primary me-2">
                      <i class="fas fa-filter me-1"></i> Filter
                    </button>
                    <button class="btn btn-sm btn-outline-primary">
                      <i class="fas fa-download me-1"></i> Export
                    </button>
                  </div>
                </div>

                <div class="test-results-list">
                  <div v-for="(test, index) in testResults" :key="index" class="test-result-card">
                    <div class="test-header">
                      <div>
                        <h3>{{ test.name }}</h3>
                        <p class="text-muted">{{ formatDate(test.date) }} • Ordered by Dr. {{ test.orderedBy }}</p>
                      </div>
                      <div class="test-status" :class="test.status.toLowerCase()">
                        {{ test.status }}
                      </div>
                    </div>
                    <div class="test-details">
                      <div v-if="test.status === 'Completed'" class="test-results">
                        <div v-for="(result, rIndex) in test.results" :key="rIndex" class="result-item">
                          <div class="result-name">{{ result.name }}</div>
                          <div class="result-value" :class="result.flag">
                            {{ result.value }} <span class="unit">{{ result.unit }}</span>
                            <span v-if="result.flag" class="flag-indicator">{{ result.flag }}</span>
                          </div>
                          <div class="result-range">{{ result.range }}</div>
                        </div>
                      </div>
                      <div v-else-if="test.status === 'Pending'" class="pending-message">
                        <i class="fas fa-hourglass-half me-2"></i>
                        Results are being processed and will be available soon.
                      </div>
                      <div v-else class="scheduled-message">
                        <i class="fas fa-calendar me-2"></i>
                        This test is scheduled for {{ formatDate(test.scheduledDate) }}.
                      </div>
                    </div>
                    <div class="test-actions">
                      <button v-if="test.status === 'Completed'" class="btn btn-sm btn-outline-primary me-2">
                        <i class="fas fa-file-pdf me-1"></i> Download PDF
                      </button>
                      <button class="btn btn-sm btn-outline-secondary">
                        <i class="fas fa-share-alt me-1"></i> Share with Doctor
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Prescriptions Tab -->
              <div v-else-if="activeTab === 'prescriptions'" class="tab-content">
                <!-- Prescription content will be added in the next step -->
                <div class="section-header d-flex justify-content-between align-items-center mb-4">
                  <h2>Prescriptions</h2>
                  <div>
                    <button class="btn btn-sm btn-outline-primary">
                      <i class="fas fa-plus me-1"></i> Request Refill
                    </button>
                  </div>
                </div>

                <div class="prescription-filters mb-4">
                  <div class="btn-group" role="group">
                    <button
                      type="button"
                      class="btn"
                      :class="prescriptionFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'"
                      @click="prescriptionFilter = 'all'"
                    >
                      All
                    </button>
                    <button
                      type="button"
                      class="btn"
                      :class="prescriptionFilter === 'active' ? 'btn-primary' : 'btn-outline-primary'"
                      @click="prescriptionFilter = 'active'"
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      class="btn"
                      :class="prescriptionFilter === 'expired' ? 'btn-primary' : 'btn-outline-primary'"
                      @click="prescriptionFilter = 'expired'"
                    >
                      Expired
                    </button>
                  </div>
                </div>

                <div class="prescription-list">
                  <div v-for="(prescription, index) in filteredPrescriptions" :key="index" class="prescription-card">
                    <div class="prescription-header">
                      <div>
                        <h3>{{ prescription.medication }}</h3>
                        <p class="text-muted">Prescribed by Dr. {{ prescription.prescribedBy }} on {{ formatDate(prescription.date) }}</p>
                      </div>
                      <div class="prescription-status" :class="prescription.status.toLowerCase()">
                        {{ prescription.status }}
                      </div>
                    </div>
                    <div class="prescription-details">
                      <div class="detail-item">
                        <span class="detail-label">Dosage:</span>
                        <span class="detail-value">{{ prescription.dosage }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Instructions:</span>
                        <span class="detail-value">{{ prescription.instructions }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Refills:</span>
                        <span class="detail-value">{{ prescription.refillsRemaining }} remaining</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Expires:</span>
                        <span class="detail-value">{{ formatDate(prescription.expiryDate) }}</span>
                      </div>
                    </div>
                    <div class="prescription-actions">
                      <button
                        v-if="prescription.status === 'Active' && prescription.refillsRemaining > 0"
                        class="btn btn-sm btn-primary me-2"
                      >
                        <i class="fas fa-sync-alt me-1"></i> Request Refill
                      </button>
                      <button class="btn btn-sm btn-outline-primary me-2">
                        <i class="fas fa-file-prescription me-1"></i> View Details
                      </button>
                      <button class="btn btn-sm btn-outline-secondary">
                        <i class="fas fa-print me-1"></i> Print
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Other tabs will be implemented in subsequent steps -->
              <div v-else class="tab-content text-center py-5">
                <div class="empty-state">
                  <i class="fas fa-tools"></i>
                  <h3>Coming Soon</h3>
                  <p>This feature is currently under development.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MedicalRecords',
  data() {
    return {
      loading: true,
      activeTab: 'summary',
      prescriptionFilter: 'all',
      vitals: {
        weight: 72,
        height: 175,
        bloodPressure: '120/80',
        heartRate: 72,
        lastUpdated: '2023-06-15'
      },
      conditions: [
        {
          name: 'Hypertension',
          diagnosedDate: '2022-03-10',
          description: 'Mild hypertension, controlled with medication and lifestyle changes.',
          status: 'Managed'
        },
        {
          name: 'Allergic Rhinitis',
          diagnosedDate: '2021-05-22',
          description: 'Seasonal allergies affecting nasal passages.',
          status: 'Active'
        }
      ],
      allergies: [
        { name: 'Penicillin', severity: 'High' },
        { name: 'Peanuts', severity: 'Medium' },
        { name: 'Dust Mites', severity: 'Low' }
      ],
      visits: [
        {
          date: '2023-05-15',
          type: 'Annual Physical',
          doctor: 'Sarah Johnson',
          reason: 'Routine checkup',
          diagnosis: 'Healthy, no significant findings',
          notes: 'Continue current medications. Follow up in 12 months.'
        },
        {
          date: '2023-02-03',
          type: 'Urgent Care',
          doctor: 'Michael Chen',
          reason: 'Persistent cough',
          diagnosis: 'Acute bronchitis',
          notes: 'Prescribed antibiotics and cough suppressant. Rest recommended.'
        },
        {
          date: '2022-11-20',
          type: 'Specialist Consultation',
          doctor: 'Emily Rodriguez',
          reason: 'Blood pressure management',
          diagnosis: 'Hypertension - well controlled',
          notes: 'Current medication regimen is effective. Continue monitoring.'
        }
      ],
      testResults: [
        {
          name: 'Complete Blood Count (CBC)',
          date: '2023-05-15',
          orderedBy: 'Sarah Johnson',
          status: 'Completed',
          results: [
            { name: 'WBC', value: '7.2', unit: 'K/uL', range: '4.5-11.0', flag: '' },
            { name: 'RBC', value: '5.1', unit: 'M/uL', range: '4.5-5.9', flag: '' },
            { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '13.5-17.5', flag: '' },
            { name: 'Hematocrit', value: '42', unit: '%', range: '41-50', flag: '' },
            { name: 'Platelets', value: '290', unit: 'K/uL', range: '150-450', flag: '' }
          ]
        },
        {
          name: 'Lipid Panel',
          date: '2023-05-15',
          orderedBy: 'Sarah Johnson',
          status: 'Completed',
          results: [
            { name: 'Total Cholesterol', value: '210', unit: 'mg/dL', range: '<200', flag: 'High' },
            { name: 'HDL', value: '55', unit: 'mg/dL', range: '>40', flag: '' },
            { name: 'LDL', value: '130', unit: 'mg/dL', range: '<100', flag: 'High' },
            { name: 'Triglycerides', value: '125', unit: 'mg/dL', range: '<150', flag: '' }
          ]
        },
        {
          name: 'Chest X-Ray',
          date: '2023-02-03',
          orderedBy: 'Michael Chen',
          status: 'Completed',
          results: [
            { name: 'Findings', value: 'No acute cardiopulmonary process', unit: '', range: '', flag: '' }
          ]
        },
        {
          name: 'Allergy Panel',
          date: '2023-06-01',
          orderedBy: 'Emily Rodriguez',
          status: 'Scheduled',
          scheduledDate: '2023-07-10'
        }
      ],
      prescriptions: [
        {
          medication: 'Lisinopril',
          dosage: '10mg',
          instructions: 'Take 1 tablet by mouth once daily',
          date: '2023-01-15',
          expiryDate: '2024-01-15',
          refillsRemaining: 3,
          prescribedBy: 'Sarah Johnson',
          status: 'Active'
        },
        {
          medication: 'Atorvastatin',
          dosage: '20mg',
          instructions: 'Take 1 tablet by mouth at bedtime',
          date: '2023-01-15',
          expiryDate: '2024-01-15',
          refillsRemaining: 3,
          prescribedBy: 'Sarah Johnson',
          status: 'Active'
        },
        {
          medication: 'Amoxicillin',
          dosage: '500mg',
          instructions: 'Take 1 capsule by mouth three times daily for 10 days',
          date: '2023-02-03',
          expiryDate: '2023-02-13',
          refillsRemaining: 0,
          prescribedBy: 'Michael Chen',
          status: 'Expired'
        }
      ]
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
          name: this.user.name || 'Demo User',
          email: this.user.email || 'demo@example.com',
          patientId: 'GMHC-' + (Math.floor(Math.random() * 90000) + 10000)
        };
      }

      // Fallback to mock data
      return {
        name: 'Demo User',
        email: 'demo@example.com',
        patientId: 'GMHC-' + (Math.floor(Math.random() * 90000) + 10000)
      };
    },
    userAvatar() {
      // Always use a placeholder image for the demo
      return 'https://via.placeholder.com/100x100';
    },
    filteredPrescriptions() {
      if (this.prescriptionFilter === 'all') {
        return this.prescriptions
      } else {
        return this.prescriptions.filter(p => p.status.toLowerCase() === this.prescriptionFilter)
      }
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    formatMonth(dateString) {
      return new Date(dateString).toLocaleDateString(undefined, { month: 'short' })
    },
    formatDay(dateString) {
      return new Date(dateString).getDate()
    },
    formatYear(dateString) {
      return new Date(dateString).getFullYear()
    }
  },
  mounted() {
    // Simulate loading data
    setTimeout(() => {
      this.loading = false
    }, 1500)
  }
}
</script>

<style scoped>
.medical-records {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.hero-section {
  padding: 60px 0;
  background-color: #fff;
  text-align: center;
  margin-bottom: 40px;
}

.hero-section h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: #333;
}

.hero-section p {
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

.records-section {
  padding-bottom: 60px;
}

.records-sidebar {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  position: sticky;
  top: 100px;
}

.user-profile {
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 15px;
  border: 3px solid #e6f2ff;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-profile h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  text-align: left;
  font-weight: 500;
  color: #555;
  transition: all 0.3s;
  cursor: pointer;
}

.menu-item i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.menu-item:hover {
  background-color: #f0f7ff;
  color: #007bff;
}

.menu-item.active {
  background-color: #007bff;
  color: #fff;
}

.records-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 30px;
  min-height: 700px;
}

.section-header {
  margin-bottom: 25px;
}

.section-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive styles */
@media (max-width: 992px) {
  .records-sidebar {
    position: static;
    margin-bottom: 30px;
  }

  .sidebar-menu {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }

  .menu-item {
    flex: 1 0 calc(50% - 8px);
    padding: 10px;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .records-content {
    padding: 20px;
  }
}

/* Vital Statistics Styles */
.vital-stat {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  height: 100%;
}

.vital-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e6f2ff;
  color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 15px;
}

.vital-info h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #666;
}

.vital-info p {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
  color: #333;
}

/* Condition List Styles */
.condition-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.condition-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
}

.condition-item:last-child {
  border-bottom: none;
}

.condition-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.condition-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.condition-status.active {
  background-color: #ffecb5;
  color: #d97706;
}

.condition-status.managed {
  background-color: #d1fae5;
  color: #059669;
}

.condition-status.resolved {
  background-color: #e0e7ff;
  color: #4f46e5;
}

/* Allergy Badge Styles */
.allergy-badge {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 10px 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
}

.allergy-badge.high {
  background-color: #fee2e2;
  color: #b91c1c;
}

.allergy-badge.medium {
  background-color: #ffedd5;
  color: #c2410c;
}

.allergy-badge.low {
  background-color: #fef3c7;
  color: #b45309;
}

.severity-indicator {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
}

/* Timeline Styles */
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 2px;
  background-color: #e9ecef;
}

.timeline-item {
  position: relative;
  margin-bottom: 30px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-date {
  position: absolute;
  left: -30px;
  top: 0;
  transform: translateX(-50%);
}

.date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 2px solid #007bff;
  border-radius: 8px;
  padding: 5px;
  width: 50px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.date-badge .month {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #007bff;
}

.date-badge .day {
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
}

.date-badge .year {
  font-size: 0.7rem;
  color: #666;
}

.visit-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.visit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.visit-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.visit-doctor {
  font-size: 0.9rem;
  color: #007bff;
  font-weight: 500;
}

.visit-details p {
  margin-bottom: 8px;
}

.visit-actions {
  margin-top: 15px;
  text-align: right;
}

/* Test Results Styles */
.test-result-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.test-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.test-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.test-status.completed {
  background-color: #d1fae5;
  color: #059669;
}

.test-status.pending {
  background-color: #e0e7ff;
  color: #4f46e5;
}

.test-status.scheduled {
  background-color: #fef3c7;
  color: #b45309;
}

.test-results {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.result-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.result-item:last-child {
  border-bottom: none;
}

.result-name {
  font-weight: 500;
  color: #333;
}

.result-value {
  font-weight: 600;
  color: #333;
  text-align: center;
}

.result-value .unit {
  font-size: 0.8rem;
  color: #666;
  font-weight: 400;
}

.result-value .flag-indicator {
  margin-left: 5px;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.result-value.high .flag-indicator {
  background-color: #fee2e2;
  color: #b91c1c;
}

.result-value.low .flag-indicator {
  background-color: #e0e7ff;
  color: #4f46e5;
}

.result-range {
  font-size: 0.9rem;
  color: #666;
  text-align: right;
}

.pending-message, .scheduled-message {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  color: #666;
  text-align: center;
}

.test-actions {
  text-align: right;
}

/* Prescription Styles */
.prescription-filters {
  display: flex;
  justify-content: center;
}

.prescription-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.prescription-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.prescription-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.prescription-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
}

.prescription-status.active {
  background-color: #d1fae5;
  color: #059669;
}

.prescription-status.expired {
  background-color: #fee2e2;
  color: #b91c1c;
}

.prescription-details {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
}

.detail-item {
  display: flex;
  margin-bottom: 8px;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-weight: 600;
  color: #666;
  width: 120px;
  flex-shrink: 0;
}

.detail-value {
  color: #333;
}

.prescription-actions {
  text-align: right;
}

/* Empty State Styles */
.empty-state {
  text-align: center;
  padding: 40px 0;
}

.empty-state i {
  font-size: 3rem;
  color: #cbd5e1;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.empty-state p {
  color: #666;
  max-width: 400px;
  margin: 0 auto;
}
</style>
