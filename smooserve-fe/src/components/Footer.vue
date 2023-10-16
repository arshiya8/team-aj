<template>
  <div class="footer">
    <div class="heading">
      <h2>SmooServe<sup>™</sup></h2>
    </div>
    <div class="content">
      <div class="social-media">
        <h4>Connect With Us</h4>
        <p><a href="#"><i class="fab fa-linkedin"></i> Linkedin</a></p>
        <p><a href="#"><i class="fab fa-twitter"></i> Twitter</a></p>
        <p><a href="#"><i class="fab fa-facebook"></i> Facebook</a></p>
        <p><a href="#"><i class="fab fa-instagram"></i> Instagram</a></p>
      </div>
      <div class="links">
        <h4>Explore</h4>
        <p><a href="#">Home</a></p>
        <p><a href="#">About</a></p>
        <p><a href="#">Blogs</a></p>
        <p><a href="#">Contact</a></p>
      </div>
      <div class="contact-details">
        <h4>Contact</h4>
        <p><i class="fas fa-phone"></i> +65 8123 4567</p>
        <p><i class="fas fa-envelope"></i> <a href="mailto:smooserve@gmail.com">smooserve@gmail.com</a></p>
      </div>
    </div>
    <footer>
        <hr />
        Copyright © 2023. SIngapore Management University. All rights reserved.<br>
        Report Vulnerability. Terms of Use. Privacy Statement. Supported Browsers.
      </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  color: #495057;
  text-align: center;
  padding: 30px 0;
}

.heading {
  font-size: 2em;
  margin-bottom: 20px;
}

.content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.social-media,
.links,
.contact-details {
  flex: 1;
  margin: 20px;
}

.social-media h4,
.links h4,
.contact-details h4 {
  font-size: 1.2em;
  margin-bottom: 15px;
}

.social-media a,
.links a,
.contact-details a {
  color: #007bff;
  text-decoration: none;
}

.social-media a:hover,
.links a:hover,
.contact-details a:hover {
  text-decoration: underline;
}

footer {
  margin-top: 30px;
  color: navy;
}

hr {
  margin: 20px 0;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
}
</style>
