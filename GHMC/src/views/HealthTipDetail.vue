<template>
  <div class="health-tip-detail">
    <!-- Hero Section -->
    <section class="hero-section" :style="{ backgroundImage: `url(${article.heroImage})` }">
      <div class="container">
        <div class="hero-content">
          <div class="category-badge">{{ article.category }}</div>
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <div class="author">
              <img :src="article.authorImage" :alt="article.author" class="author-image">
              <span>By {{ article.author }}</span>
            </div>
            <div class="date">
              <i class="fa fa-calendar"></i>
              <span>{{ formatDate(article.date) }}</span>
            </div>
            <div class="read-time">
              <i class="fa fa-clock-o"></i>
              <span>{{ article.readTime }} min read</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Article Content -->
    <section class="article-section">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <!-- Article Content -->
            <div class="article-content">
              <div class="article-summary">
                <p>{{ article.summary }}</p>
              </div>

              <div v-for="(section, index) in article.content" :key="index" class="content-section">
                <h2 v-if="section.title" class="section-title">{{ section.title }}</h2>
                <div v-if="section.image" class="section-image">
                  <img :src="section.image" :alt="section.imageAlt || section.title">
                  <p v-if="section.imageCaption" class="image-caption">{{ section.imageCaption }}</p>
                </div>
                <div v-html="section.text" class="section-text"></div>
              </div>

              <!-- Tips Section -->
              <div v-if="article.tips && article.tips.length > 0" class="tips-section">
                <h2 class="section-title">Key Takeaways</h2>
                <ul class="tips-list">
                  <li v-for="(tip, index) in article.tips" :key="index" class="tip-item">
                    <div class="tip-icon">
                      <i class="fa fa-check-circle"></i>
                    </div>
                    <div class="tip-text">{{ tip }}</div>
                  </li>
                </ul>
              </div>

              <!-- References -->
              <div v-if="article.references && article.references.length > 0" class="references-section">
                <h3 class="section-title">References</h3>
                <ol class="references-list">
                  <li v-for="(reference, index) in article.references" :key="index" class="reference-item">
                    <a :href="reference.url" target="_blank" rel="noopener noreferrer">{{ reference.text }}</a>
                  </li>
                </ol>
              </div>

              <!-- Tags -->
              <div class="article-tags">
                <span class="tag-label">Tags:</span>
                <div class="tags">
                  <router-link
                    v-for="tag in article.tags"
                    :key="tag"
                    :to="{ path: '/health-tips', query: { tag: tag }}"
                    class="tag"
                  >
                    {{ tag }}
                  </router-link>
                </div>
              </div>

              <!-- Share -->
              <div class="article-share">
                <span class="share-label">Share:</span>
                <div class="share-buttons">
                  <a href="#" @click.prevent="shareArticle('facebook')" class="share-button facebook">
                    <i class="fa fa-facebook"></i>
                  </a>
                  <a href="#" @click.prevent="shareArticle('twitter')" class="share-button twitter">
                    <i class="fa fa-twitter"></i>
                  </a>
                  <a href="#" @click.prevent="shareArticle('linkedin')" class="share-button linkedin">
                    <i class="fa fa-linkedin"></i>
                  </a>
                  <a href="#" @click.prevent="shareArticle('email')" class="share-button email">
                    <i class="fa fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            <!-- Author Bio -->
            <div class="author-bio">
              <div class="author-image">
                <img :src="article.authorImage" :alt="article.author">
              </div>
              <div class="author-info">
                <h3 class="author-name">{{ article.author }}</h3>
                <p class="author-title">{{ article.authorTitle }}</p>
                <p class="author-description">{{ article.authorBio }}</p>
                <div class="author-social">
                  <a v-if="article.authorSocial?.twitter" :href="article.authorSocial.twitter" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-twitter"></i>
                  </a>
                  <a v-if="article.authorSocial?.linkedin" :href="article.authorSocial.linkedin" target="_blank" rel="noopener noreferrer">
                    <i class="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="col-lg-4">
            <div class="sidebar">
              <!-- Table of Contents -->
              <div class="sidebar-widget toc-widget">
                <h3 class="widget-title">Table of Contents</h3>
                <ul class="toc-list">
                  <li v-for="(section, index) in article.content" :key="index" v-if="section.title">
                    <a href="#" @click.prevent="scrollToSection(section.title)">{{ section.title }}</a>
                  </li>
                </ul>
              </div>

              <!-- Related Articles -->
              <div class="sidebar-widget related-widget">
                <h3 class="widget-title">Related Articles</h3>
                <div class="related-articles">
                  <div v-for="(relatedArticle, index) in relatedArticles" :key="index" class="related-article">
                    <router-link :to="{ name: 'HealthTipDetail', params: { id: relatedArticle.id } }">
                      <div class="related-image">
                        <img :src="relatedArticle.image" :alt="relatedArticle.title">
                      </div>
                      <div class="related-content">
                        <h4 class="related-title">{{ relatedArticle.title }}</h4>
                        <div class="related-meta">
                          <span class="related-date">{{ formatDate(relatedArticle.date) }}</span>
                          <span class="related-category">{{ relatedArticle.category }}</span>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>

              <!-- Categories -->
              <div class="sidebar-widget categories-widget">
                <h3 class="widget-title">Categories</h3>
                <ul class="categories-list">
                  <li v-for="(category, index) in categories" :key="index" class="category-item">
                    <router-link :to="{ path: '/health-tips', query: { category: category.name } }">
                      {{ category.name }}
                      <span class="category-count">{{ category.count }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>

              <!-- Newsletter -->
              <div class="sidebar-widget newsletter-widget">
                <h3 class="widget-title">Subscribe to Our Newsletter</h3>
                <p>Get the latest health tips and updates delivered to your inbox.</p>
                <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Your email address"
                      v-model="email"
                      required
                    >
                  </div>
                  <button type="submit" class="btn btn-primary w-100">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- More Articles -->
    <section class="more-articles-section">
      <div class="container">
        <h2 class="section-title text-center">More Health Tips</h2>
        <div class="row">
          <div v-for="(article, index) in moreArticles" :key="index" class="col-md-4 mb-4">
            <div class="article-card">
              <router-link :to="{ name: 'HealthTipDetail', params: { id: article.id } }">
                <div class="article-image">
                  <img :src="article.image" :alt="article.title">
                  <div class="article-category">{{ article.category }}</div>
                </div>
                <div class="article-card-content">
                  <h3 class="article-card-title">{{ article.title }}</h3>
                  <p class="article-card-summary">{{ article.summary }}</p>
                  <div class="article-card-meta">
                    <span class="article-card-date">{{ formatDate(article.date) }}</span>
                    <span class="article-card-read">{{ article.readTime }} min read</span>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <router-link to="/health-tips" class="btn btn-outline-primary">View All Health Tips</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HealthTipDetail',
  data() {
    return {
      email: '',
      article: {
        id: 1,
        title: 'Maintaining a Healthy Diet During the Pandemic',
        category: 'Nutrition',
        date: '2023-05-10',
        author: 'Dr. Sarah Johnson',
        authorTitle: 'Nutritionist, MD',
        authorImage: 'https://placehold.co/200x200/e1ddf0/333333.png?text=Dr.+Johnson',
        authorBio: 'Dr. Sarah Johnson is a board-certified nutritionist with over 10 years of experience in dietary counseling and preventive healthcare.',
        authorSocial: {
          twitter: 'https://twitter.com/drsarahjohnson',
          linkedin: 'https://linkedin.com/in/drsarahjohnson'
        },
        heroImage: 'https://placehold.co/1200x600/e1ddf0/333333.png?text=Healthy+Diet',
        readTime: 8,
        summary: 'Learn how to maintain a balanced diet and boost your immune system during these challenging times. We share practical tips for meal planning and healthy eating habits that can help you stay healthy and energized.',
        content: [
          {
            title: 'Why Nutrition Matters During a Pandemic',
            text: '<p>During a pandemic, maintaining proper nutrition becomes even more crucial. A well-balanced diet supports your immune system, helps manage stress, and provides the energy needed to navigate challenging times.</p><p>Research has shown that specific nutrients play vital roles in supporting immune function. These include vitamins A, C, D, E, B6, and B12, as well as zinc, iron, copper, selenium, and protein. Ensuring adequate intake of these nutrients can help your body defend against infections.</p>'
          },
          {
            title: 'Planning Balanced Meals',
            image: 'https://placehold.co/800x400/e1ddf0/333333.png?text=Balanced+Meal',
            imageAlt: 'A balanced meal with vegetables, protein, and whole grains',
            imageCaption: 'A well-balanced plate should include vegetables, lean protein, and whole grains.',
            text: '<p>Creating balanced meals doesn\'t have to be complicated. Follow these simple guidelines:</p><ul><li><strong>Fill half your plate with fruits and vegetables</strong> - aim for a variety of colors to get different nutrients</li><li><strong>Include lean protein sources</strong> - such as poultry, fish, beans, or tofu</li><li><strong>Choose whole grains</strong> - like brown rice, quinoa, or whole wheat bread</li><li><strong>Add healthy fats</strong> - such as avocados, nuts, seeds, and olive oil</li><li><strong>Stay hydrated</strong> - drink plenty of water throughout the day</li></ul>'
          },
          {
            title: 'Immune-Boosting Foods',
            text: '<p>While no single food can prevent illness, certain foods can support immune function:</p><ul><li><strong>Citrus fruits</strong> - rich in vitamin C, which may help increase white blood cell production</li><li><strong>Red bell peppers</strong> - contain twice as much vitamin C as citrus fruits</li><li><strong>Broccoli</strong> - packed with vitamins A, C, and E, as well as fiber</li><li><strong>Garlic</strong> - has immune-boosting properties due to compounds like allicin</li><li><strong>Ginger</strong> - can help decrease inflammation and soothe sore throats</li><li><strong>Spinach</strong> - contains numerous antioxidants and beta carotene</li><li><strong>Yogurt</strong> - look for varieties with live and active cultures that may stimulate the immune system</li><li><strong>Almonds</strong> - contain vitamin E, which is key for immune health</li><li><strong>Turmeric</strong> - has anti-inflammatory properties</li><li><strong>Green tea</strong> - contains powerful antioxidants called EGCG</li></ul>'
          },
          {
            title: 'Meal Prepping Strategies',
            text: '<p>Meal prepping can help you maintain healthy eating habits even during busy or stressful times:</p><ol><li><strong>Set aside dedicated time</strong> - Choose a specific day each week for meal planning and preparation</li><li><strong>Start small</strong> - Begin by prepping just one meal type, such as lunches for the workweek</li><li><strong>Batch cook staples</strong> - Prepare larger quantities of versatile ingredients like rice, beans, or roasted vegetables</li><li><strong>Use proper storage containers</strong> - Invest in quality containers that keep food fresh longer</li><li><strong>Label everything</strong> - Include the date prepared and contents</li><li><strong>Freeze extra portions</strong> - Many meals can be frozen for later use</li></ol>'
          },
          {
            title: 'Managing Emotional Eating',
            text: '<p>During stressful times like a pandemic, emotional eating can become more common. Here are strategies to help manage it:</p><ul><li><strong>Recognize triggers</strong> - Keep a food journal to identify patterns</li><li><strong>Practice mindful eating</strong> - Pay attention to hunger cues and eat without distractions</li><li><strong>Find alternative coping mechanisms</strong> - Try activities like walking, deep breathing, or calling a friend</li><li><strong>Keep healthy snacks accessible</strong> - Make nutritious options easy to grab</li><li><strong>Be kind to yourself</strong> - Occasional indulgences are normal and part of a balanced approach</li></ul>'
          }
        ],
        tips: [
          'Prioritize fruits, vegetables, lean proteins, and whole grains in your diet',
          'Stay hydrated by drinking plenty of water throughout the day',
          'Include immune-supporting nutrients like vitamins C, D, and zinc',
          'Prepare meals in advance to maintain healthy eating habits during busy times',
          'Practice mindful eating to avoid stress-induced overeating',
          'Limit processed foods, excessive sugar, and alcohol consumption'
        ],
        references: [
          {
            text: 'Harvard T.H. Chan School of Public Health. (2020). Nutrition and Immunity.',
            url: 'https://www.hsph.harvard.edu/nutritionsource/nutrition-and-immunity/'
          },
          {
            text: 'World Health Organization. (2020). Nutrition advice for adults during the COVID-19 outbreak.',
            url: 'https://www.who.int/news-room/campaigns/connecting-the-world-to-combat-coronavirus'
          },
          {
            text: 'Academy of Nutrition and Dietetics. (2020). How to Keep Your Immune System Healthy.',
            url: 'https://www.eatright.org/health/wellness/preventing-illness/how-to-keep-your-immune-system-healthy'
          }
        ],
        tags: ['Nutrition', 'Immune Health', 'Meal Planning', 'Healthy Eating', 'Pandemic']
      },
      relatedArticles: [
        {
          id: 2,
          title: 'The Importance of Regular Exercise for Mental Health',
          category: 'Fitness',
          date: '2023-04-28',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Exercise'
        },
        {
          id: 3,
          title: 'Understanding Vaccination: Benefits and Common Concerns',
          category: 'Preventive Care',
          date: '2023-04-15',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Vaccination'
        },
        {
          id: 4,
          title: 'Managing Stress in Everyday Life',
          category: 'Mental Health',
          date: '2023-03-15',
          image: 'https://placehold.co/400x300/e1ddf0/333333.png?text=Stress+Management'
        }
      ],
      moreArticles: [
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
        }
      ],
      categories: [
        { name: 'Nutrition', count: 12 },
        { name: 'Fitness', count: 8 },
        { name: 'Mental Health', count: 10 },
        { name: 'Wellness', count: 15 },
        { name: 'Cardiovascular Health', count: 6 },
        { name: 'Preventive Care', count: 9 }
      ]
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    scrollToSection(sectionTitle) {
      const sectionElements = document.querySelectorAll('.section-title')
      for (const element of sectionElements) {
        if (element.textContent === sectionTitle) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          break
        }
      }
    },
    shareArticle(platform) {
      const url = window.location.href
      const title = this.article.title

      let shareUrl = ''

      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
          break
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
          break
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
          break
        case 'email':
          shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`
          break
      }

      if (shareUrl) {
        window.open(shareUrl, '_blank')
      }
    },
    subscribeNewsletter() {
      // In a real application, this would send the email to a backend service
      alert(`Thank you for subscribing with ${this.email}! You will now receive our health tips newsletter.`)
      this.email = ''
    }
  },
  mounted() {
    // In a real application, this would fetch the article data based on the route parameter
    document.title = `${this.article.title} - Great Minds Healthcare Center`

    // Scroll to top when the component is mounted
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding: 120px 0;
  color: white;
  margin-bottom: 60px;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.category-badge {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 20px;
}

.article-title {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 25px;
  line-height: 1.2;
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.author {
  display: flex;
  align-items: center;
}

.author-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  border: 2px solid white;
}

.date, .read-time {
  display: flex;
  align-items: center;
}

.date i, .read-time i {
  margin-right: 8px;
}

/* Article Section */
.article-section {
  padding-bottom: 60px;
}

.article-content {
  margin-bottom: 40px;
}

.article-summary {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.content-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-bottom: 10px;
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

.section-image {
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
}

.section-image img {
  width: 100%;
  height: auto;
  display: block;
}

.image-caption {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  margin-top: 10px;
  font-style: italic;
}

.section-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
}

.section-text p {
  margin-bottom: 20px;
}

.section-text ul, .section-text ol {
  margin-bottom: 20px;
  padding-left: 20px;
}

.section-text li {
  margin-bottom: 10px;
}

/* Tips Section */
.tips-section {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  margin: 40px 0;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tip-item {
  display: flex;
  margin-bottom: 15px;
}

.tip-icon {
  color: #007bff;
  margin-right: 15px;
  font-size: 1.2rem;
}

.tip-text {
  flex: 1;
  font-size: 1.1rem;
  line-height: 1.5;
}

/* References Section */
.references-section {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.references-list {
  padding-left: 20px;
}

.reference-item {
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #666;
}

.reference-item a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

.reference-item a:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* Tags */
.article-tags {
  display: flex;
  align-items: center;
  margin: 30px 0;
  flex-wrap: wrap;
}

.tag-label {
  font-weight: 600;
  margin-right: 10px;
  color: #333;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  display: inline-block;
  padding: 5px 12px;
  background-color: #f0f7ff;
  color: #007bff;
  border-radius: 20px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s;
}

.tag:hover {
  background-color: #007bff;
  color: white;
}

/* Share */
.article-share {
  display: flex;
  align-items: center;
  margin: 30px 0;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.share-label {
  font-weight: 600;
  margin-right: 15px;
  color: #333;
}

.share-buttons {
  display: flex;
  gap: 10px;
}

.share-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s;
}

.share-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.share-button.facebook {
  background-color: #3b5998;
}

.share-button.twitter {
  background-color: #1da1f2;
}

.share-button.linkedin {
  background-color: #0077b5;
}

.share-button.email {
  background-color: #ea4335;
}

/* Author Bio */
.author-bio {
  display: flex;
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 40px;
}

.author-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  flex-shrink: 0;
}

.author-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
}

.author-title {
  font-size: 1rem;
  color: #007bff;
  margin-bottom: 15px;
}

.author-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 15px;
}

.author-social {
  display: flex;
  gap: 10px;
}

.author-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e1ddf0;
  color: #007bff;
  transition: all 0.3s;
}

.author-social a:hover {
  background-color: #007bff;
  color: white;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 100px;
}

.sidebar-widget {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 30px;
}

.widget-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-bottom: 10px;
}

.widget-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(to right, #007bff, #170752);
}

/* Table of Contents */
.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  margin-bottom: 10px;
}

.toc-list a {
  color: #555;
  text-decoration: none;
  transition: all 0.3s;
  display: block;
  padding: 8px 10px;
  border-radius: 5px;
}

.toc-list a:hover {
  background-color: #e1ddf0;
  color: #007bff;
}

/* Related Articles */
.related-articles {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.related-article {
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.related-article:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.related-article a {
  display: flex;
  text-decoration: none;
  color: inherit;
}

.related-image {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-content {
  flex: 1;
}

.related-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  transition: color 0.3s;
}

.related-meta {
  display: flex;
  font-size: 0.8rem;
  color: #666;
}

.related-date {
  margin-right: 10px;
}

.related-article:hover .related-title {
  color: #007bff;
}

/* Categories */
.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  margin-bottom: 10px;
}

.category-item a {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  color: #555;
  text-decoration: none;
  transition: all 0.3s;
}

.category-item a:hover {
  background-color: #e1ddf0;
  color: #007bff;
}

.category-count {
  background-color: #e1ddf0;
  color: #007bff;
  border-radius: 20px;
  padding: 2px 8px;
  font-size: 0.8rem;
}

/* Newsletter */
.newsletter-widget {
  background: linear-gradient(120deg, #007bff, #170752);
  color: white;
}

.newsletter-widget .widget-title {
  color: white;
}

.newsletter-widget .widget-title::after {
  background: white;
}

.newsletter-widget p {
  margin-bottom: 20px;
  opacity: 0.9;
}

.newsletter-form .form-group {
  margin-bottom: 15px;
}

.newsletter-form .form-control {
  border-radius: 5px;
  padding: 12px 15px;
  border: none;
}

.newsletter-form .btn {
  border-radius: 5px;
  padding: 12px;
  background-color: white;
  color: #007bff;
  border: none;
  font-weight: 600;
}

.newsletter-form .btn:hover {
  background-color: #f8f9fa;
}

/* More Articles Section */
.more-articles-section {
  background-color: #f8f9fa;
  padding: 60px 0;
}

.more-articles-section .section-title {
  margin-bottom: 40px;
}

.article-card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
  transition: all 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.article-card a {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.article-image {
  position: relative;
  height: 200px;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-category {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.article-card-content {
  padding: 20px;
}

.article-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
}

.article-card-summary {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.article-card-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #888;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero-section {
    padding: 80px 0;
  }

  .article-title {
    font-size: 2.2rem;
  }

  .sidebar {
    margin-top: 60px;
    position: static;
  }

  .author-bio {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .author-image {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .author-social {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .article-summary {
    font-size: 1.1rem;
  }

  .section-text {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .hero-section {
    padding: 40px 0;
    margin-bottom: 40px;
  }

  .article-title {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  .category-badge {
    font-size: 0.8rem;
    padding: 4px 10px;
    margin-bottom: 15px;
  }

  .tips-section {
    padding: 20px;
  }

  .article-tags, .article-share {
    flex-direction: column;
    align-items: flex-start;
  }

  .tag-label, .share-label {
    margin-bottom: 10px;
  }
}
</style>
