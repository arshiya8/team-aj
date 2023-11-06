<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";


export default {
  components: {
    NavBar,
    Footer,
  },
};
</script>


<template>
  <NavBar/>
  <div>
    <div class="parallax-container">
      <img class="parallax-image "
        src="https://vivace.smu.edu.sg/sites/vivace.smu.edu.sg/files/styles/w1000/public/2023-07/UNI%20Y%204.jpeg?itok=t5Eq0_Yr">
      <div class="image-text">
        <h1>About Smooserve</h1>
      </div>
    </div>

    <div class="custom-container">
      <div class="why">

        <h2 class="title">Why was Smooserve Created?</h2>
        <p class="subtitle">Current Solutions have a...</p>
        <div class="card-container">
          <div class="card">
            <div class="icon-box">
              <span class="pi pi-envelope"></span>
            </div>
            <div class="card-content">
              <div class="card-title">CSP Emails Overload</div>
              <div class="card-text">
                Currently, information about OCSP's and CSP's are largely disseminated through emails. This
                causes a backlog of emails where students are unable to filter and sift through to find
                the CSP that truly matches their interests.
              </div>
            </div>
          </div>
        
        <div class="card ">
          <div class="icon-box">
            <span class="pi pi-globe"></span>
          </div>
          <div class="card-title text-h5">Lack of CSP Information</div>
          <div class="card-text">
            There is currently a lack of information available on ontrac, this is especially true
            for students wanting to search for overseas CSP's. This makes it hard for students to be
            able to find out crucial information about projects and plan their time accordingly.
          </div>

        </div>
        <div class="card ">
          <div class="icon-box">
            <span class="pi pi-question"></span>
          </div>
          <div class="card-title text-h5">Decentralized Information</div>
          <div class="card-text">
            Currently, there are three main streams of finding projects to join: 1. Email, 2. Ontrac, 3.
            Social Media. This decentralization makes students have to look in many different places
            for CSP's that may not use that channel of information.
          </div>
        </div>

      </div>
    </div>

  </div>
  
<div class="s-container">
  <div class="s-features">
    <h2 class="title">Our Solution, for Students</h2>
    <div class="s-styling">
      <div class="row">
        <div class="flex-box-shadow-4">
          <div class="card-circle spaces">
            <div class="text-circles">CSP Matching</div>
          </div>
        </div>
        <div class="flex-box-shadow-4">
          <div class="card-circle spaces">
            <div class="text-circles">Personalized Quiz</div>
          </div>
        </div>
        <div class="flex-box-shadow-4">
          <div class="card-circle spaces">
            <div class="text-circles">Save Your Favourite CSP's</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  
<div class="c-container">
  <div class="c-features">
    <h2 class="title">Our Solution, for CSP Organisations</h2>
    <div class="c-styling">
      <div class="row">
        <div class="flex-box-shadow-5">
          <div class="card-circle spaces">
            <div class="text-circles">Easy Interview Scheduling</div>
          </div>
        </div>
        <div class="flex-box-shadow-5">
          <div class="card-circle spaces">
            <div class="text-circles">Organisation Dashboard</div>
          </div>
        </div>
        <div class="flex-box-shadow-5">
          <div class="card-circle spaces">
            <div class="text-circles">Customize your own website</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
  <Footer/>
</template>


<style scoped>
.parallax-container {
  position: relative;
  overflow: hidden;
  padding:0;
  margin:0;
  /* Set the desired height of the parallax container as 100% of the viewport height */
}

.parallax-image {
  width: 100%;
  height: 100%;
  background-image: url('https://vivace.smu.edu.sg/sites/vivace.smu.edu.sg/files/styles/w1000/public/2023-07/UNI%20Y%204.jpeg?itok=t5Eq0_Yr');
  background-size: cover;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  /* Create the parallax effect by fixing the background */
}

.image-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.image-text h1 {
  font-size: 4rem; /* Adjust the font size as needed */
  color: rgba(255, 255, 255, 0.731);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card-container {
  display: flex;
  justify-content: center; 
  flex-wrap:wrap;

}

.custom-container {
  background-image: url('https://wallpaperaccess.com/full/876546.jpg');
  /* Add your desired image URL here */
  background-size: cover;
  background-position: center;
  min-height: 400px;
  /* Set the minimum height of the container to maintain the aspect ratio of the image */

}

.card {
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-align: center; 
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-top: 40px;
  margin:5px;
}
.text-circles{
  font-family:Tahoma, Verdana, sans-serif;
  font-size:20px;
  color:white;
}
.icon-box {
  width: 70px;
  height: 70px;
  background-color: #f1f1f1;
  border: 3px solid #333;
  border-radius: 30%; /* Make the icon-box round */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center; /* Center the icon horizontally */
  align-items: center; /* Center the icon vertically */
  margin-bottom: 15px; /* Add spacing between icon and text */
}
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.title {
  color: #00008B;
  font-size: 3em;
  text-align: center;
  font-weight: 600;
  font-family: Graphik Web, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, 'Helvetica', 'Arial', 'sans-serif';
  letter-spacing: 1.5px;
}

.subtitle {
  color: grey;
  display: grid;
  place-items: center;
}
.s-features{
  background-image: linear-gradient(to bottom, #f6eae8, rgb(120, 146, 235));
  min-height: 100%;
}
.row{
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
  height:50%;
  margin-top:40px;
  margin-bottom:50px;
  
}
.c-container{
  margin-top:100px;
}
.card-title {
  text-align: center;
  font-weight: bold;
  font-size: larger;
}
.flex-box-shadow-4 {
  display: flex;
  justify-content: center;
  align-items: center;
  height:300px;
  width:300px;
  background-color: blue;
  border-radius: 50%;
  margin:auto;
  flex-direction: column;
  margin-top:20px;
  margin-bottom:20px;
  
}

.c-styling{
  background-image: url('https://wallpaperaccess.com/full/876546.jpg');
  /* Add your desired image URL here */
  background-size: cover;
  background-position: center;
  min-height: 100%;
}
.flex-box-shadow-5 {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align:center;
  height:300px;
  width:300px;
  background-color: rgb(13, 158, 211);
  border-radius: 50%;
  margin:auto;
  margin-top:20px;
}
/* Media query for larger screens */

@media (max-width: 640px) {
  .flex-box-shadow-4, .flex-box-shadow-5 {
    height: 15rem;
    width: 15rem;
  }
}
@media (min-width: 640px) {
  .row {
    flex-wrap: wrap;
  }
}

</style>
