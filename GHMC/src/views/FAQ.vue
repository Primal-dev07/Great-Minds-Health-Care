<template>
  <div class="faq-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="hero-title">Frequently Asked Questions</h1>
              <p class="hero-text">
                Find answers to common questions about our healthcare services, appointments, insurance, and more.
              </p>
              <div class="search-container">
                <form @submit.prevent="searchFAQs">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search questions..."
                      v-model="searchQuery"
                    >
                    <button class="btn btn-primary" type="submit">
                      <i class="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <div class="hero-image">
              <img src="https://placehold.co/800x600/e1ddf0/333333.png?text=FAQ" alt="Frequently Asked Questions">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Content Section -->
    <section class="faq-section">
      <div class="container">
        <div class="row">
          <!-- Category Sidebar -->
          <div class="col-lg-3">
            <div class="category-sidebar">
              <h3 class="sidebar-title">Categories</h3>
              <ul class="category-list">
                <li
                  v-for="(category, index) in categories"
                  :key="index"
                  :class="{ active: selectedCategory === category.id }"
                >
                  <a href="#" @click.prevent="filterByCategory(category.id)">
                    <i :class="category.icon"></i>
                    {{ category.name }}
                    <span class="count">{{ getCategoryCount(category.id) }}</span>
                  </a>
                </li>
              </ul>

              <div class="need-help-box">
                <h4>Need More Help?</h4>
                <p>Can't find what you're looking for? Our support team is here to help.</p>
                <router-link to="/contact" class="btn btn-outline-primary">Contact Us</router-link>
              </div>
            </div>
          </div>

          <!-- FAQ Content -->
          <div class="col-lg-9">
            <!-- Search Results -->
            <div v-if="searchQuery" class="search-results mb-4">
              <h2 class="section-title">
                Search Results for "{{ searchQuery }}"
                <span v-if="filteredFAQs.length > 0">({{ filteredFAQs.length }} results)</span>
              </h2>
              <button class="btn btn-sm btn-outline-secondary" @click="clearSearch">
                <i class="fa fa-times me-1"></i> Clear Search
              </button>
            </div>

            <!-- Category Title -->
            <div v-else-if="selectedCategory !== 'all'" class="category-title mb-4">
              <h2 class="section-title">
                {{ getCategoryName(selectedCategory) }}
              </h2>
              <button class="btn btn-sm btn-outline-secondary" @click="filterByCategory('all')">
                <i class="fa fa-arrow-left me-1"></i> All Categories
              </button>
            </div>

            <!-- No Results -->
            <div v-if="filteredFAQs.length === 0" class="no-results">
              <div class="no-results-icon">
                <i class="fa fa-search"></i>
              </div>
              <h3>No questions found</h3>
              <p>We couldn't find any questions matching your search criteria.</p>
              <button class="btn btn-outline-primary" @click="clearSearch">
                Clear Search
              </button>
            </div>

            <!-- FAQ Accordion -->
            <div v-else class="faq-accordion">
              <div class="accordion" id="faqAccordion">
                <div
                  v-for="(faq, index) in filteredFAQs"
                  :key="faq.id"
                  class="accordion-item"
                >
                  <h2 class="accordion-header" :id="'heading' + faq.id">
                    <button
                      class="accordion-button"
                      :class="{ collapsed: !isOpen(faq.id) }"
                      type="button"
                      @click="toggleFAQ(faq.id)"
                      :aria-expanded="isOpen(faq.id)"
                      :aria-controls="'collapse' + faq.id"
                    >
                      <span class="faq-category-badge" :class="faq.category">
                        {{ getCategoryName(faq.category) }}
                      </span>
                      {{ faq.question }}
                    </button>
                  </h2>
                  <div
                    :id="'collapse' + faq.id"
                    class="accordion-collapse collapse"
                    :class="{ show: isOpen(faq.id) }"
                    :aria-labelledby="'heading' + faq.id"
                    data-bs-parent="#faqAccordion"
                  >
                    <div class="accordion-body">
                      <div v-html="faq.answer"></div>

                      <div v-if="faq.relatedLinks && faq.relatedLinks.length > 0" class="related-links">
                        <h5>Related Information:</h5>
                        <ul>
                          <li v-for="(link, linkIndex) in faq.relatedLinks" :key="linkIndex">
                            <router-link v-if="link.internal" :to="link.url">
                              {{ link.text }}
                            </router-link>
                            <a v-else :href="link.url" target="_blank" rel="noopener noreferrer">
                              {{ link.text }} <i class="fa fa-external-link-alt fa-xs"></i>
                            </a>
                          </li>
                        </ul>
                      </div>

                      <div class="faq-feedback">
                        <p>Was this answer helpful?</p>
                        <div class="feedback-buttons">
                          <button class="btn btn-sm btn-outline-success me-2" @click="provideFeedback(faq.id, true)">
                            <i class="fa fa-thumbs-up me-1"></i> Yes
                          </button>
                          <button class="btn btn-sm btn-outline-danger" @click="provideFeedback(faq.id, false)">
                            <i class="fa fa-thumbs-down me-1"></i> No
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-container">
          <div class="row align-items-center">
            <div class="col-lg-7">
              <h2 class="contact-title">Still Have Questions?</h2>
              <p class="contact-text">
                Our team is here to help you with any questions or concerns you may have about our healthcare services.
              </p>
              <div class="contact-options">
                <div class="contact-option">
                  <div class="option-icon">
                    <i class="fa fa-phone"></i>
                  </div>
                  <div class="option-content">
                    <h4>Call Us</h4>
                    <p>+233 55 785 2345</p>
                    <p class="text-muted">Mon-Fri: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div class="contact-option">
                  <div class="option-icon">
                    <i class="fa fa-envelope"></i>
                  </div>
                  <div class="option-content">
                    <h4>Email Us</h4>
                    <p>info@gmhc.com</p>
                    <p class="text-muted">We'll respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="contact-form-container">
                <h3>Send Us a Message</h3>
                <form @submit.prevent="submitQuestion" class="contact-form">
                  <div class="mb-3">
                    <label for="name" class="form-label">Your Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="contactForm.name"
                      required
                    >
                  </div>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email Address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="contactForm.email"
                      required
                    >
                  </div>
                  <div class="mb-3">
                    <label for="question" class="form-label">Your Question</label>
                    <textarea
                      class="form-control"
                      id="question"
                      rows="4"
                      v-model="contactForm.question"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary w-100">
                    <span v-if="!submitting">Submit Question</span>
                    <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'FAQPage',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      openFAQs: [],
      submitting: false,
      contactForm: {
        name: '',
        email: '',
        question: ''
      },
      categories: [
        { id: 'all', name: 'All Categories', icon: 'fa fa-th-large' },
        { id: 'appointments', name: 'Appointments', icon: 'fa fa-calendar-alt' },
        { id: 'services', name: 'Our Services', icon: 'fa fa-stethoscope' },
        { id: 'insurance', name: 'Insurance & Billing', icon: 'fa fa-credit-card' },
        { id: 'medical', name: 'Medical Information', icon: 'fa fa-heartbeat' },
        { id: 'covid', name: 'COVID-19', icon: 'fa fa-virus' },
        { id: 'telemedicine', name: 'Telemedicine', icon: 'fa fa-video' }
      ],
      faqs: [
        {
          id: 1,
          category: 'appointments',
          question: 'How do I schedule an appointment?',
          answer: '<p>You can schedule an appointment in several ways:</p><ul><li>Online through our patient portal</li><li>Using our mobile app</li><li>Calling our appointment line at +233 55 785 2345</li><li>Visiting our reception desk in person</li></ul><p>For new patients, we recommend creating an account on our patient portal first, which will streamline the appointment process.</p>',
          relatedLinks: [
            { text: 'Book an Appointment', url: '/appointments/book', internal: true },
            { text: 'Patient Portal', url: '/dashboard', internal: true }
          ]
        },
        {
          id: 2,
          category: 'appointments',
          question: 'What should I bring to my first appointment?',
          answer: '<p>For your first appointment, please bring the following:</p><ul><li>Valid government-issued photo ID (passport, driver\'s license, etc.)</li><li>Insurance card (if applicable)</li><li>List of current medications</li><li>Medical records or referrals from other healthcare providers</li><li>Payment method for copays or self-pay fees</li></ul><p>We recommend arriving 15 minutes early to complete any necessary paperwork.</p>'
        },
        {
          id: 3,
          category: 'appointments',
          question: 'How do I cancel or reschedule an appointment?',
          answer: '<p>You can cancel or reschedule your appointment through our patient portal, mobile app, or by calling our appointment line at +233 55 785 2345.</p><p>We request that you provide at least 24 hours\' notice for cancellations or rescheduling. This allows us to offer the time slot to other patients who may need urgent care.</p><p>Repeated no-shows or late cancellations may result in a fee.</p>'
        },
        {
          id: 4,
          category: 'services',
          question: 'What services does Great Minds Healthcare Center offer?',
          answer: '<p>Great Minds Healthcare Center offers a comprehensive range of healthcare services, including:</p><ul><li>Primary care for adults and children</li><li>Specialist consultations</li><li>Preventive care and screenings</li><li>Diagnostic services (laboratory tests, imaging)</li><li>Chronic disease management</li><li>Vaccinations and immunizations</li><li>Mental health services</li><li>Telemedicine consultations</li></ul><p>For specific information about any of these services, please visit our Services page or contact our office.</p>',
          relatedLinks: [
            { text: 'Our Services', url: '/services', internal: true },
            { text: 'Meet Our Doctors', url: '/doctors', internal: true }
          ]
        },
        {
          id: 5,
          category: 'services',
          question: 'Do you offer emergency services?',
          answer: '<p>Great Minds Healthcare Center does not provide emergency room services. If you are experiencing a life-threatening emergency, please call emergency services (911) or go to the nearest emergency room immediately.</p><p>We do offer same-day appointments for urgent but non-emergency medical issues during our regular business hours. Please call our office as early as possible to schedule an urgent appointment.</p><p>For after-hours urgent care needs that are not emergencies, please call our main number for guidance from our on-call provider.</p>'
        },
        {
          id: 6,
          category: 'insurance',
          question: 'What insurance plans do you accept?',
          answer: '<p>We accept most major insurance plans, including:</p><ul><li>National Health Insurance Scheme (NHIS)</li><li>Ghana Health Service Insurance</li><li>Private health insurance plans (Nationwide, Enterprise, etc.)</li><li>International health insurance plans</li></ul><p>Insurance coverage varies by plan and service. We recommend contacting your insurance provider to verify coverage before your appointment.</p><p>If you have questions about whether we accept your specific insurance plan, please contact our billing department.</p>',
          relatedLinks: [
            { text: 'Insurance Information', url: '/insurance', internal: true }
          ]
        },
        {
          id: 7,
          category: 'insurance',
          question: 'What if I don\'t have insurance?',
          answer: '<p>If you don\'t have insurance, we offer self-pay options with transparent pricing for our services. We strive to make healthcare accessible to all patients, regardless of insurance status.</p><p>We can provide cost estimates before your appointment so you know what to expect. Payment plans may be available for certain services.</p><p>Our staff can also provide information about community resources and assistance programs that may help with healthcare costs.</p>'
        },
        {
          id: 8,
          category: 'medical',
          question: 'How can I access my medical records?',
          answer: '<p>You can access your medical records through our secure patient portal, which allows you to view:</p><ul><li>Visit summaries</li><li>Test results</li><li>Medication lists</li><li>Immunization records</li><li>And more</li></ul><p>If you need a complete copy of your medical records or records from before you became our patient, you can submit a medical records request form. There may be a small fee for processing extensive records requests.</p><p>For medical records requests, please allow 5-7 business days for processing.</p>',
          relatedLinks: [
            { text: 'Patient Portal', url: '/dashboard', internal: true },
            { text: 'Medical Records', url: '/medical-records', internal: true }
          ]
        },
        {
          id: 9,
          category: 'medical',
          question: 'How do I get a prescription refill?',
          answer: '<p>There are several ways to request a prescription refill:</p><ol><li>Through our patient portal (recommended)</li><li>Using our mobile app</li><li>Calling our pharmacy line at +233 55 785 2346</li><li>Having your pharmacy send a refill request directly to us</li></ol><p>Please request refills at least 3 business days before you run out of medication. Controlled substances may require an appointment before refills can be authorized.</p><p>For new prescriptions or if you haven\'t had a check-up in over a year, you may need to schedule an appointment before the refill can be approved.</p>'
        },
        {
          id: 10,
          category: 'covid',
          question: 'Do you offer COVID-19 testing and vaccination?',
          answer: '<p>Yes, we offer both COVID-19 testing and vaccination services.</p><p><strong>Testing:</strong> We provide PCR and rapid antigen testing for COVID-19. Testing may be scheduled by appointment or during walk-in hours, depending on availability.</p><p><strong>Vaccination:</strong> We offer COVID-19 vaccines as recommended by health authorities. Vaccine availability may vary, so please check our website or call our office for current information.</p><p>Most insurance plans cover COVID-19 testing and vaccination. If you\'re uninsured, government programs may cover these services at no cost to you.</p>',
          relatedLinks: [
            { text: 'COVID-19 Information', url: 'https://www.who.int/emergencies/diseases/novel-coronavirus-2019', internal: false }
          ]
        },
        {
          id: 11,
          category: 'covid',
          question: 'What COVID-19 safety measures do you have in place?',
          answer: '<p>We maintain strict safety protocols to protect our patients and staff:</p><ul><li>Enhanced cleaning and disinfection procedures</li><li>Screening of all patients and visitors for symptoms</li><li>Appropriate personal protective equipment (PPE) for all staff</li><li>Social distancing measures in waiting areas</li><li>Telemedicine options for eligible appointments</li></ul><p>Our protocols are regularly updated to align with the latest guidance from health authorities. We appreciate your cooperation with these measures during your visit.</p>'
        },
        {
          id: 12,
          category: 'telemedicine',
          question: 'How do telemedicine appointments work?',
          answer: '<p>Telemedicine appointments allow you to consult with our healthcare providers via secure video conferencing from the comfort of your home. Here\'s how they work:</p><ol><li>Schedule a telemedicine appointment through our patient portal or by calling our office</li><li>You\'ll receive instructions and a link via email or text message</li><li>At your appointment time, click the link to join the secure video call</li><li>The provider will conduct the consultation, discuss your concerns, and provide recommendations</li></ol><p>You\'ll need a device with a camera and microphone (smartphone, tablet, or computer) and a stable internet connection.</p>',
          relatedLinks: [
            { text: 'Book a Telemedicine Appointment', url: '/appointments/book', internal: true }
          ]
        },
        {
          id: 13,
          category: 'telemedicine',
          question: 'What conditions can be treated through telemedicine?',
          answer: '<p>Many conditions can be effectively evaluated and treated through telemedicine, including:</p><ul><li>Cold and flu symptoms</li><li>Allergies</li><li>Rashes and minor skin conditions</li><li>Follow-up appointments for chronic conditions</li><li>Medication management</li><li>Mental health consultations</li><li>Review of test results</li></ul><p>However, some conditions require in-person evaluation. Our providers will advise if you need to be seen in person after your telemedicine consultation.</p>'
        },
        {
          id: 14,
          category: 'insurance',
          question: 'How does billing work for your services?',
          answer: '<p>Our billing process works as follows:</p><ol><li>We verify your insurance coverage before your appointment</li><li>Copays and deductibles are collected at the time of service</li><li>We submit claims to your insurance company</li><li>Your insurance processes the claim and determines your responsibility</li><li>You\'ll receive a statement for any remaining balance</li></ol><p>Payment options include cash, credit/debit cards, checks, and online payments through our patient portal. If you have questions about a bill, please contact our billing department at +233 55 785 2347.</p>'
        },
        {
          id: 15,
          category: 'appointments',
          question: 'What are your office hours?',
          answer: '<p>Our regular office hours are:</p><ul><li>Monday - Friday: 8:00 AM - 6:00 PM</li><li>Saturday: 9:00 AM - 1:00 PM</li><li>Sunday: Closed</li></ul><p>We offer extended hours on Tuesdays and Thursdays until 8:00 PM for patients who cannot visit during regular business hours.</p><p>Please note that specific departments or services may have different hours. Always check our website or call ahead to confirm availability for specialized services.</p>'
        }
      ]
    }
  },
  computed: {
    filteredFAQs() {
      let filtered = [...this.faqs]

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
        )
      }

      // Filter by category
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(faq => faq.category === this.selectedCategory)
      }

      return filtered
    }
  },
  methods: {
    searchFAQs() {
      // Reset category filter when searching
      if (this.searchQuery) {
        this.selectedCategory = 'all'
      }
    },
    clearSearch() {
      this.searchQuery = ''
      this.selectedCategory = 'all'
    },
    filterByCategory(categoryId) {
      this.selectedCategory = categoryId
      this.searchQuery = ''
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId)
      return category ? category.name : ''
    },
    getCategoryCount(categoryId) {
      if (categoryId === 'all') {
        return this.faqs.length
      }
      return this.faqs.filter(faq => faq.category === categoryId).length
    },
    toggleFAQ(faqId) {
      if (this.isOpen(faqId)) {
        this.openFAQs = this.openFAQs.filter(id => id !== faqId)
      } else {
        this.openFAQs.push(faqId)
      }
    },
    isOpen(faqId) {
      return this.openFAQs.includes(faqId)
    },
    provideFeedback(faqId, isHelpful) {
      // In a real application, this would send feedback to a backend service
      alert(`Thank you for your feedback! We ${isHelpful ? 'are glad this was helpful' : 'will work to improve this answer'}.`)
    },
    submitQuestion() {
      // Validate form
      if (!this.contactForm.name || !this.contactForm.email || !this.contactForm.question) {
        alert('Please fill in all fields')
        return
      }

      // Simulate form submission
      this.submitting = true

      setTimeout(() => {
        this.submitting = false
        alert('Your question has been submitted. We will get back to you within 24 hours.')

        // Reset form
        this.contactForm = {
          name: '',
          email: '',
          question: ''
        }
      }, 1500)
    }
  },
  mounted() {
    document.title = 'Frequently Asked Questions - Great Minds Healthcare Center'

    // Check for query parameters
    const { category, search } = this.$route.query

    if (category) {
      const validCategory = this.categories.find(c => c.id === category)
      if (validCategory) {
        this.selectedCategory = validCategory.id
      }
    }

    if (search) {
      this.searchQuery = search
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.faq-page {
  padding-bottom: 60px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  padding: 100px 0;
  margin-bottom: 60px;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.1), rgba(23, 7, 82, 0.1));
  z-index: 1;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: -80px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(23, 7, 82, 0.05), rgba(0, 123, 255, 0.05));
  z-index: 1;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
}

.hero-text {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.hero-image {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.search-container {
  max-width: 500px;
}

.search-container .input-group {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 30px;
  overflow: hidden;
}

.search-container .form-control {
  border: none;
  padding: 15px 20px;
  font-size: 1rem;
}

.search-container .btn {
  padding: 0 25px;
  border: none;
}

/* FAQ Section */
.faq-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #007bff, #170752);
}

/* Category Sidebar */
.category-sidebar {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 100px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

.category-sidebar:hover {
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.12);
  transform: translateY(-5px);
}

.sidebar-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 12px;
  letter-spacing: 0.3px;
}

.sidebar-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #007bff, #170752);
  border-radius: 3px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
}

.category-list li {
  margin-bottom: 10px;
}

.category-list li a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  border-radius: 8px;
  color: #444;
  text-decoration: none;
  transition: all 0.3s;
  font-weight: 500;
  letter-spacing: 0.2px;
  border: 1px solid transparent;
  margin-bottom: 8px;
}

.category-list li a i {
  margin-right: 12px;
  color: #007bff;
  width: 24px;
  text-align: center;
  font-size: 1.1rem;
  transition: transform 0.2s;
}

.category-list li a:hover {
  background: linear-gradient(120deg, #f0f7ff, #e8f0fe);
  color: #007bff;
  transform: translateX(5px);
  border-color: rgba(0, 123, 255, 0.1);
}

.category-list li a:hover i {
  transform: scale(1.2);
}

.category-list li.active a {
  background: linear-gradient(120deg, #007bff, #0056b3);
  color: white;
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
  transform: translateX(5px);
}

.category-list li.active a i {
  color: white;
  transform: scale(1.2);
}

.count {
  background-color: #e1ddf0;
  color: #007bff;
  border-radius: 20px;
  padding: 2px 8px;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.category-list li.active .count {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.need-help-box {
  background: linear-gradient(120deg, #007bff, #170752);
  color: white;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
}

.need-help-box h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.need-help-box p {
  margin-bottom: 20px;
  opacity: 0.9;
}

.need-help-box .btn {
  background-color: white;
  color: #007bff;
  border: none;
  padding: 8px 20px;
  font-weight: 500;
}

.need-help-box .btn:hover {
  background-color: rgba(255, 255, 255, 0.9);
}

/* FAQ Accordion */
.faq-accordion {
  margin-bottom: 40px;
}

.accordion-item {
  border: none;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.accordion-item:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.accordion-button {
  padding: 22px 25px;
  font-size: 1.15rem;
  font-weight: 600;
  color: #333;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: none;
  box-shadow: none;
  transition: all 0.3s ease;
  letter-spacing: 0.2px;
}

.accordion-button:not(.collapsed) {
  color: #007bff;
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%);
  box-shadow: none;
}

.accordion-button:focus {
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  border-color: transparent;
}

.accordion-button::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23007bff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.faq-category-badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-right: 15px;
  background-color: #f0f7ff;
  color: #007bff;
}

.faq-category-badge.appointments {
  background-color: #e1f5fe;
  color: #0288d1;
}

.faq-category-badge.services {
  background-color: #e8f5e9;
  color: #388e3c;
}

.faq-category-badge.insurance {
  background-color: #fff8e1;
  color: #ffa000;
}

.faq-category-badge.medical {
  background-color: #f3e5f5;
  color: #8e24aa;
}

.faq-category-badge.covid {
  background-color: #ffebee;
  color: #e53935;
}

.faq-category-badge.telemedicine {
  background-color: #e8eaf6;
  color: #3949ab;
}

.accordion-body {
  padding: 20px;
  background-color: #f8f9fa;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
}

.accordion-body p {
  margin-bottom: 15px;
}

.accordion-body ul, .accordion-body ol {
  margin-bottom: 15px;
  padding-left: 20px;
}

.accordion-body li {
  margin-bottom: 8px;
}

.related-links {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
}

.related-links h5 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.related-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.related-links li {
  margin-bottom: 8px;
}

.related-links a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

.related-links a:hover {
  text-decoration: underline;
}

.faq-feedback {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.faq-feedback p {
  margin-bottom: 0;
  font-weight: 500;
  color: #333;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 60px 0;
}

.no-results-icon {
  font-size: 3rem;
  color: #e0e0e0;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.no-results p {
  color: #666;
  margin-bottom: 20px;
}

/* Contact Section */
.contact-section {
  background-color: #f8f9fa;
  padding: 60px 0;
}

.contact-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.contact-title {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.contact-text {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.contact-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.contact-option {
  display: flex;
  align-items: flex-start;
  flex: 1 0 calc(50% - 10px);
  min-width: 250px;
}

.option-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(120deg, #007bff, #170752);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.option-icon i {
  color: white;
  font-size: 1.2rem;
}

.option-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.option-content p {
  margin-bottom: 5px;
  color: #555;
}

.option-content .text-muted {
  font-size: 0.9rem;
  color: #888;
}

.contact-form-container {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 30px;
}

.contact-form-container h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.contact-form .form-label {
  font-weight: 500;
  color: #555;
}

.contact-form .form-control {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 12px 15px;
}

.contact-form .form-control:focus {
  border-color: #b8c9f1;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
}

.contact-form .btn {
  padding: 12px;
  font-weight: 500;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-section {
    padding: 60px 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .category-sidebar {
    margin-bottom: 30px;
    position: static;
  }

  .contact-container {
    padding: 30px;
  }

  .contact-title {
    font-size: 1.8rem;
  }

  .contact-form-container {
    margin-top: 30px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .category-list li {
    margin-bottom: 0;
    flex: 0 0 auto;
  }

  .category-list li a {
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  .accordion-button {
    padding: 15px;
    font-size: 1rem;
  }

  .faq-category-badge {
    font-size: 0.7rem;
    padding: 3px 8px;
    margin-right: 10px;
  }

  .contact-option {
    flex: 1 0 100%;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 30px 0;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .search-container .form-control {
    padding: 10px 15px;
  }

  .category-sidebar {
    padding: 20px;
  }

  .need-help-box {
    padding: 20px;
  }

  .contact-container {
    padding: 20px;
  }

  .contact-form-container {
    padding: 20px;
  }

  .faq-feedback {
    flex-direction: column;
    align-items: flex-start;
  }

  .faq-feedback p {
    margin-bottom: 10px;
  }
}
</style>
