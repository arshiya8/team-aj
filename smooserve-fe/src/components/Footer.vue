<template>
    <div class="footer">
      <div class="heading">
        <h2>SmooServe<sup>™</sup></h2>
      </div>
      <div class="content">
        <div class="social-media">
          <h4>Social</h4>
          <p><a href="#"><i class="fab fa-linkedin"></i> Linkedin</a></p>
          <p><a href="#"><i class="fab fa-twitter"></i> Twitter</a></p>
          <p><a href="#"><i class="fab fa-facebook"></i> Facebook</a></p>
          <p><a href="#"><i class="fab fa-instagram"></i> Instagram</a></p>
        </div>
        <div class="links">
          <h4>Quick links</h4>
          <p><a href="#">Home</a></p>
          <p><a href="#">About</a></p>
          <p><a href="#">Blogs</a></p>
          <p><a href="#">Contact</a></p>
        </div>
        <div class="details">
          <h4 class="mobile">Mobile</h4>
          <p><a href="#">+65 8123 4567</a></p>
          <h4 class="mail">Email</h4>
          <p><a href="SmooServe@gmail.com">SmooServe@gmail.com</a></p>
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
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .footer {
  background-color: rgb(173, 183, 230);
  color: black;
  position: relative; /* Change 'fixed' to 'relative' */
  width: 100%;
  bottom: 0;
  left: 0;
  text-align: center; /* Center align text in the footer */
  padding: 10px 0; /* Add some padding to the top and bottom of the footer */
}

  .footer .heading {
    color: black;
    max-width: 1010px;
    width: 90%;
    text-transform: uppercase;
    margin: 0 auto;
    margin-bottom: 3rem;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  }
  
  .footer .content {
    display: flex;
    justify-content: space-evenly;
    margin: 1.5rem;
  }
  
  .footer .content p {
    margin-bottom: 1.3rem;
  }
  
  .footer .content a {
    text-decoration: none;
    color: black;
  }
  
  .footer .content a:hover {
    border-bottom: 1px solid #971717;
  }
  
  .footer .content h4 {
    margin-bottom: 1.3rem;
    font-size: 19px;
  }
  
  footer {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  footer hr {
    margin: 2rem 0;
  }
  
  @media (max-width: 767px) {
    .footer .content {
      display: flex;
      flex-direction: column;
      font-size: 14px;
    }
  
    .footer {
      position: unset;
    }
  }
  
  @media (min-width: 768px) and (max-width: 1024px) {
    .footer .content,
    .footer {
      font-size: 14px;
    }
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    .footer {
      position: unset;
    }
  }
  </style>
  