<script setup>
</script>
<style>
.container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-container {
  width: 50%;
  height: auto;
  padding-right: 50px;
  padding-top: 50px;
}

.right-container {
  width: 50%;
  height: auto;
}

/* Add custom CSS for the image */
.carousel-item img {
  max-width: 100%;
  height: auto;
}
.aboutussection {
  padding-left: 50px;
  padding-top: 50px;
}
.carousel-caption {
  color: white; /* Text color */
  text-shadow: -1px -1px 0 #000, /* Top left */ 1px -1px 0 #000,
    /* Top right */ -1px 1px 0 #000, /* Bottom left */ 1px 1px 0 #000; /* Bottom right */
}
</style>
<template>
  <div class="container">
    <div class="left-container">
      <!-- put the carousel in a box and center it -->

      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://www.littlestepsasia.com/wp-content/uploads/2019/03/Volunteering-With-Kids-In-Singapore.jpg"
              class="d-block w-100"
              alt="I did this in Malaysia"
            />
          </div>

          <div class="carousel-item">
            <img
              src="https://dollarsandsense.sg/wp-content/uploads/2023/06/Featured-Image-Youth-Volunteering.jpeg"
              class="d-block w-100"
              alt="I did this in Singapore"
            />
          </div>

          <div class="carousel-item">
            <img
              src="https://static.honeykidsasia.com/wp-content/uploads/2022/06/kids-volunteering-singapore-ron-lach-pexels-900x643.jpg"
              class="d-block w-100"
              alt="I did this in Vietnam"
            />
          </div>
        </div>

        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>

        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <div class="right-container">
      <div class="text">
        <h2>About Us</h2>
        <p>
          We made ______ as we strive to enhance SMU students' ability to find
          and search for more community service projects (CSP). The current
          solution of Ontrac is not user friendly and leaves students confused
          on how to find proper CSP's. Furthermore, there is a mass of emails
          sent to students' inboxes every day, making it very difficult for
          students to be able to filter out projects that they prefer and find
          enjoyable.
        </p>
        <p>
          With ___ we have simplified this searching process, with students
          being able to see aspects of the CSP, apply, and search for CSPs that
          suit their interests in one place! This UI is simple and ensures that
          students are able to truly harness their interest in helping
          communities.
        </p>
      </div>
    </div>
  </div>
  <div class="aboutussection">
    <div
      class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3"
    >
      <div class="max-w-2xl">
        <h2>Why?</h2>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          We are students of WAD2 G1T6! We decided to create this website as we
          have also experienced the troubles of finding CSP's that cater to our
          interests. If we are able to help you find a CSP that you are
          passionate about, we hope that you will want to continue with that
          CSP, even potentially after university.
        </p>
      </div>
    </div>
  </div>

  <!-- Bootstrap Carousel with Text Menu -->
  <div class="container">
    <div class="left-container">
      <!-- Bootstrap Carousel -->
      <div id="carouselExampleCaptions2" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions2"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions2"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions2"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://www.littlestepsasia.com/wp-content/uploads/2019/03/Volunteering-With-Kids-In-Singapore.jpg"
              class="d-block w-100"
              alt="I did this in Malaysia"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Click for next Story</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://dollarsandsense.sg/wp-content/uploads/2023/06/Featured-Image-Youth-Volunteering.jpeg"
              class="d-block w-100"
              alt="I did this in Singapore"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Click for next Story</h5>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="https://static.honeykidsasia.com/wp-content/uploads/2022/06/kids-volunteering-singapore-ron-lach-pexels-900x643.jpg"
              class="d-block w-100"
              alt="I did this in Vietnam"
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>Click for next Story</h5>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions2"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions2"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="right-container">
      <!-- Text Menu -->
      <h2>Image Descriptions</h2>
      <ul id="imageDescriptions">
        <!-- JavaScript will populate this list -->
      </ul>
    </div>
  </div>
</template>
