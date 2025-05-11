<template>
  <div class="health-tips">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="hero-title">Health Tips & Articles</h1>
              <p class="hero-text">
                Explore our collection of expert-written health articles, tips, and resources to help you live a healthier life.
              </p>
              <div class="search-container">
                <form @submit.prevent="searchArticles">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search health tips..."
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
              <img src="https://placehold.co/800x600/e1ddf0/333333.png?text=Health+Tips" alt="Health Tips and Articles">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-container">
          <div class="row">
            <div class="col-md-6">
              <div class="filter-group">
                <label>Categories</label>
                <div class="category-filters">
                  <button
                    class="category-filter"
                    :class="{ active: selectedCategory === 'all' }"
                    @click="filterByCategory('all')"
                  >
                    All
                  </button>
                  <button
                    v-for="category in categories"
                    :key="category.name"
                    class="category-filter"
                    :class="{ active: selectedCategory === category.name }"
                    @click="filterByCategory(category.name)"
                  >
                    {{ category.name }}
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="filter-group">
                <label>Sort By</label>
                <select class="form-select" v-model="sortBy" @change="sortArticles">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles Section -->
    <section class="articles-section">
      <div class="container">
        <!-- Featured Article -->
        <div v-if="featuredArticle && !searchQuery" class="featured-article">
          <div class="row">
            <div class="col-lg-6">
              <div class="featured-image">
                <img :src="featuredArticle.image" :alt="featuredArticle.title">
                <div class="featured-badge">Featured</div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="featured-content">
                <div class="featured-category">{{ featuredArticle.category }}</div>
                <h2 class="featured-title">{{ featuredArticle.title }}</h2>
                <p class="featured-summary">{{ featuredArticle.summary }}</p>
                <div class="featured-meta">
                  <div class="meta-item">
                    <i class="fa fa-calendar"></i>
                    <span>{{ formatDate(featuredArticle.date) }}</span>
                  </div>
                  <div class="meta-item">
                    <i class="fa fa-clock-o"></i>
                    <span>{{ featuredArticle.readTime }} min read</span>
                  </div>
                </div>
                <router-link :to="{ name: 'HealthTipDetail', params: { id: featuredArticle.id } }" class="btn btn-primary">
                  Read Article
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Results -->
        <div v-if="searchQuery" class="search-results">
          <h2 class="section-title">
            Search Results for "{{ searchQuery }}"
            <span v-if="filteredArticles.length > 0">({{ filteredArticles.length }} results)</span>
          </h2>
        </div>

        <!-- Category Title -->
        <div v-else-if="selectedCategory !== 'all'" class="category-title">
          <h2 class="section-title">{{ selectedCategory }} Articles</h2>
        </div>

        <!-- No Results -->
        <div v-if="filteredArticles.length === 0" class="no-results">
          <div class="no-results-icon">
            <i class="fa fa-search"></i>
          </div>
          <h3>No articles found</h3>
          <p>We couldn't find any articles matching your search criteria.</p>
          <button class="btn btn-outline-primary" @click="resetFilters">
            Clear Filters
          </button>
        </div>

        <!-- Articles Grid -->
        <div v-else class="row">
          <div v-for="article in paginatedArticles" :key="article.id" class="col-lg-4 col-md-6 mb-4">
            <div class="article-card">
              <router-link :to="{ name: 'HealthTipDetail', params: { id: article.id } }">
                <div class="article-image">
                  <img :src="article.image" :alt="article.title">
                  <div class="article-category">{{ article.category }}</div>
                </div>
                <div class="article-content">
                  <h3 class="article-title">{{ article.title }}</h3>
                  <p class="article-summary">{{ article.summary }}</p>
                  <div class="article-meta">
                    <div class="meta-item">
                      <i class="fa fa-calendar"></i>
                      <span>{{ formatDate(article.date) }}</span>
                    </div>
                    <div class="meta-item">
                      <i class="fa fa-clock-o"></i>
                      <span>{{ article.readTime }} min read</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredArticles.length > 0" class="pagination-container">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                  <i class="fa fa-chevron-left"></i>
                </a>
              </li>
              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
              >
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                  <i class="fa fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <h2 class="newsletter-title">Subscribe to Our Health Tips Newsletter</h2>
              <p class="newsletter-text">
                Get the latest health tips, articles, and updates delivered straight to your inbox.
              </p>
            </div>
            <div class="col-lg-6">
              <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Your email address"
                    v-model="email"
                    required
                  >
                  <button class="btn btn-primary" type="submit">
                    <span v-if="!subscribing">Subscribe</span>
                    <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </button>
                </div>
                <div v-if="subscriptionMessage" class="subscription-message" :class="{ 'success': subscriptionSuccess }">
                  {{ subscriptionMessage }}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HealthTips',
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      sortBy: 'newest',
      currentPage: 1,
      articlesPerPage: 6,
      email: '',
      subscribing: false,
      subscriptionMessage: '',
      subscriptionSuccess: false,
      categories: [
        { name: 'Nutrition', count: 12 },
        { name: 'Fitness', count: 8 },
        { name: 'Mental Health', count: 10 },
        { name: 'Wellness', count: 15 },
        { name: 'Cardiovascular Health', count: 6 },
        { name: 'Preventive Care', count: 9 }
      ],
      articles: [
        {
          id: 1,
          title: 'Maintaining a Healthy Diet During the Pandemic',
          category: 'Nutrition',
          date: '2023-05-10',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Healthy+Diet',
          summary: 'Learn how to maintain a balanced diet and boost your immune system during these challenging times.',
          readTime: 8,
          featured: true
        },
        {
          id: 2,
          title: 'The Importance of Regular Exercise for Mental Health',
          category: 'Fitness',
          date: '2023-04-28',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Exercise',
          summary: 'Discover how physical activity can improve your mood, reduce anxiety, and boost overall mental wellbeing.',
          readTime: 6
        },
        {
          id: 3,
          title: 'Understanding Vaccination: Benefits and Common Concerns',
          category: 'Preventive Care',
          date: '2023-04-15',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Vaccination',
          summary: 'Learn about how vaccines work, their importance for public health, and addressing common misconceptions.',
          readTime: 10
        },
        {
          id: 4,
          title: 'Managing Stress in Everyday Life',
          category: 'Mental Health',
          date: '2023-03-15',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Stress+Management',
          summary: 'Practical techniques and strategies to help you manage stress and improve your quality of life.',
          readTime: 7
        },
        {
          id: 5,
          title: 'The Benefits of Adequate Sleep',
          category: 'Wellness',
          date: '2023-05-05',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Sleep',
          summary: 'Discover why quality sleep is essential for your physical and mental health, and learn practical tips for improving your sleep habits.',
          readTime: 6
        },
        {
          id: 6,
          title: 'Heart-Healthy Eating Patterns',
          category: 'Cardiovascular Health',
          date: '2023-04-20',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Heart+Health',
          summary: 'Learn about dietary patterns that support heart health and reduce the risk of cardiovascular disease.',
          readTime: 7
        },
        {
          id: 7,
          title: 'Staying Hydrated: Why Water Matters',
          category: 'Nutrition',
          date: '2023-04-10',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Hydration',
          summary: 'Understand the importance of proper hydration for overall health and learn how to maintain optimal fluid intake throughout the day.',
          readTime: 5
        },
        {
          id: 8,
          title: 'Building a Sustainable Fitness Routine',
          category: 'Fitness',
          date: '2023-03-25',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Fitness+Routine',
          summary: 'Tips for creating an exercise routine that you can maintain long-term for better health and fitness results.',
          readTime: 8
        },
        {
          id: 9,
          title: 'Understanding Blood Pressure Readings',
          category: 'Cardiovascular Health',
          date: '2023-03-10',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Blood+Pressure',
          summary: 'Learn what your blood pressure numbers mean and how to maintain healthy levels through lifestyle changes.',
          readTime: 6
        },
        {
          id: 10,
          title: 'The Role of Vitamins and Supplements',
          category: 'Nutrition',
          date: '2023-02-28',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Vitamins',
          summary: 'A guide to understanding when supplements are necessary and how to choose the right ones for your health needs.',
          readTime: 9
        }
      ]
    }
  },
  computed: {
    featuredArticle() {
      return this.articles.find(article => article.featured)
    },
    filteredArticles() {
      let filtered = [...this.articles]

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(article =>
          article.title.toLowerCase().includes(query) ||
          article.summary.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query)
        )
      }

      // Filter by category
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(article => article.category === this.selectedCategory)
      }

      // Remove featured article from regular list if showing featured section
      if (this.featuredArticle && !this.searchQuery && this.selectedCategory === 'all') {
        filtered = filtered.filter(article => article.id !== this.featuredArticle.id)
      }

      // Sort articles
      switch (this.sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
          break
        case 'oldest':
          filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
          break
        case 'az':
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'za':
          filtered.sort((a, b) => b.title.localeCompare(a.title))
          break
      }

      return filtered
    },
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.articlesPerPage
      const endIndex = startIndex + this.articlesPerPage
      return this.filteredArticles.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.filteredArticles.length / this.articlesPerPage)
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    searchArticles() {
      this.currentPage = 1
    },
    filterByCategory(category) {
      this.selectedCategory = category
      this.currentPage = 1
    },
    sortArticles() {
      this.currentPage = 1
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        window.scrollTo({
          top: document.querySelector('.articles-section').offsetTop - 100,
          behavior: 'smooth'
        })
      }
    },
    resetFilters() {
      this.searchQuery = ''
      this.selectedCategory = 'all'
      this.sortBy = 'newest'
      this.currentPage = 1
    },
    subscribeNewsletter() {
      // Validate email
      if (!this.validateEmail(this.email)) {
        this.subscriptionMessage = 'Please enter a valid email address.'
        this.subscriptionSuccess = false
        return
      }

      // Simulate API call
      this.subscribing = true
      this.subscriptionMessage = ''

      setTimeout(() => {
        this.subscribing = false
        this.subscriptionSuccess = true
        this.subscriptionMessage = 'Thank you for subscribing to our newsletter!'
        this.email = ''

        // Clear success message after 5 seconds
        setTimeout(() => {
          this.subscriptionMessage = ''
        }, 5000)
      }, 1500)
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  },
  mounted() {
    document.title = 'Health Tips & Articles - Great Minds Healthcare Center'

    // Check for query parameters
    const { category, search } = this.$route.query
    if (category) {
      const validCategory = this.categories.find(c => c.name.toLowerCase() === category.toLowerCase())
      if (validCategory) {
        this.selectedCategory = validCategory.name
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
.health-tips {
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

/* Filter Section */
.filter-section {
  margin-bottom: 40px;
}

.filter-container {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.filter-group {
  margin-bottom: 15px;
}

.filter-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-filter {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.category-filter:hover {
  background-color: #f0f7ff;
  color: #007bff;
  border-color: #007bff;
}

.category-filter.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.form-select {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

/* Articles Section */
.articles-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
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

/* Featured Article */
.featured-article {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.featured-image {
  position: relative;
  height: 100%;
  min-height: 300px;
  border-radius: 10px;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #007bff;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.featured-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.featured-category {
  display: inline-block;
  background-color: #f0f7ff;
  color: #007bff;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.featured-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.3;
}

.featured-summary {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
  flex-grow: 1;
}

.featured-meta {
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;
}

.meta-item i {
  margin-right: 8px;
  color: #007bff;
}

/* Article Cards */
.article-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  height: 100%;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
}

.article-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 15px 40px rgba(0, 123, 255, 0.2);
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: 15px;
  z-index: -1;
}

.article-card:hover {
  transform: translateY(-10px);
}

.article-card:hover::after {
  opacity: 1;
}

.article-card a {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.article-image {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.article-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.2) 100%);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-card:hover .article-image::before {
  opacity: 1;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.article-card:hover .article-image img {
  transform: scale(1.08);
}

.article-category {
  position: absolute;
  top: 15px;
  left: 15px;
  background: linear-gradient(120deg, #007bff, #0056b3);
  color: white;
  padding: 6px 15px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 3px 10px rgba(0, 123, 255, 0.3);
  z-index: 2;
  transition: all 0.3s ease;
}

.article-card:hover .article-category {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.4);
}

.article-content {
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 220px);
  position: relative;
}

.article-content::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(to right, #007bff, #170752);
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-card:hover .article-content::after {
  opacity: 1;
}

.article-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #333;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.article-card:hover .article-title {
  color: #007bff;
}

.article-summary {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 18px;
  line-height: 1.6;
  flex-grow: 1;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #888;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
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

/* Pagination */
.pagination-container {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f8f9fa;
  color: #666;
  text-decoration: none;
  transition: all 0.3s;
}

.page-link:hover {
  background-color: #e1ddf0;
  color: #007bff;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: white;
}

.page-item.disabled .page-link {
  color: #ccc;
  pointer-events: none;
}

/* Newsletter Section */
.newsletter-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e1ddf0 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(0, 123, 255, 0.05), rgba(23, 7, 82, 0.05));
  z-index: 1;
}

.newsletter-section::after {
  content: '';
  position: absolute;
  bottom: -150px;
  left: -150px;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: linear-gradient(120deg, rgba(23, 7, 82, 0.03), rgba(0, 123, 255, 0.03));
  z-index: 1;
}

.newsletter-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 15px;
  padding: 50px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.newsletter-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.newsletter-text {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 0;
  line-height: 1.6;
}

.newsletter-form {
  margin-top: 20px;
}

.newsletter-form .input-group {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-radius: 50px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.newsletter-form .input-group:focus-within {
  box-shadow: 0 15px 35px rgba(0, 123, 255, 0.15);
  transform: translateY(-3px);
}

.newsletter-form .form-control {
  border: none;
  padding: 18px 25px;
  font-size: 1.05rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  transition: all 0.3s ease;
}

.newsletter-form .form-control:focus {
  background: #ffffff;
}

.newsletter-form .btn {
  padding: 0 30px;
  border: none;
  min-width: 150px;
  font-weight: 600;
  letter-spacing: 0.5px;
  background: linear-gradient(120deg, #007bff, #0056b3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.newsletter-form .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
  transition: all 0.4s ease;
}

.newsletter-form .btn:hover::before {
  left: 100%;
}

.subscription-message {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #dc3545;
}

.subscription-message.success {
  color: #28a745;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-section {
    padding: 60px 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .featured-image {
    margin-bottom: 20px;
  }

  .featured-content {
    padding: 0;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
  }

  .hero-title {
    font-size: 1.8rem;
  }

  .filter-container {
    padding: 15px;
  }

  .category-filters {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
    -webkit-overflow-scrolling: touch;
  }

  .category-filter {
    flex: 0 0 auto;
  }

  .featured-article {
    padding: 20px;
  }

  .featured-title {
    font-size: 1.5rem;
  }

  .featured-summary {
    font-size: 1rem;
  }

  .newsletter-container {
    padding: 30px 20px;
  }

  .newsletter-title {
    font-size: 1.5rem;
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

  .featured-badge {
    font-size: 0.8rem;
    padding: 3px 10px;
  }

  .featured-title {
    font-size: 1.3rem;
  }

  .featured-meta {
    flex-direction: column;
    gap: 10px;
  }

  .pagination .page-link {
    width: 35px;
    height: 35px;
  }
}
</style>
