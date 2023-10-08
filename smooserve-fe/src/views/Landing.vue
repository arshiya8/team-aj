<script >
import NavBar from "../components/NavBar.vue"
import CaroPics from "../components/CaroPics.vue";
export default {
  components: {
    NavBar,
    CaroPics,
  },

  data() {
    return {
      selectedValue1: '', // Initialize with default values if needed
      selectedValue2: '',
      selectedValue3: '',
    };
  },
};

</script>

<template>
  <!-- navbar component -->
  <NavBar />
  <CaroPics />

  <div class="container-fluid" style="background-color: lightblue;">
    <div class="row">
      <h2 style="color:black; font-weight: bold; text-align: center; margin-top: 30px; font-size: 2rem">COMMUNITY SERVICE PROJECTS</h2><br>
      <h2 style="color:red; font-weight: bold; text-align: center; font-size: 4rem;">THIS MONTH</h2>
    </div>
  </div>

  <div class="ct">
    <div class="card-container">
        <div class="card rd">
            <img style="border-radius: 15px;" src="layout/images/card1.jpg" >  
        </div>
        <div class="card rd">
            <img style="border-radius: 15px;" src="layout/images/card2.jpg" >
            
        </div>
        <div class="card rd">
            <img style="border-radius: 15px;" src="layout/images/card3.jpg" >
        </div>
    </div>

  </div>
  


  <!-- body -->
  <div class="container-fluid" style="background-color: navy">
    <div class="row">
      <div class="col">
    <h1 style="font-weight: bold; text-align: center; color:white;">What's happening in Smooserve</h1>
    <div>
    </div>
      <div class="row" style="text-align: center;">
        <!-- First Dropdown List -->
    <div class="dropdown">
      <label for="dropdown1">Causes:</label>
      <select id="dropdown1" v-model="selectedValue1">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    

    <!-- Second Dropdown List -->
    
      <label for="dropdown2">Skills:</label>
      <select id="dropdown2" v-model="selectedValue2">
        <option value="optionA">Option A</option>
        <option value="optionB">Option B</option>
        <option value="optionC">Option C</option>
      </select>
    

    <!-- Third Dropdown List -->
    
      <label for="dropdown3">Date:</label>
      <select id="dropdown3" v-model="selectedValue3">
        <option value="choiceX">Choice X</option>
        <option value="choiceY">Choice Y</option>
        <option value="choiceZ">Choice Z</option>
      </select>
    </div>


    <!-- Display selected values -->
    <div class="row justify-content-center" style="color:white; font-weight: bold; font-size: 20px;">
      Selected Value 1: {{ selectedValue1 }}
      Selected Value 2: {{ selectedValue2 }}
      Selected Value 3: {{ selectedValue3 }}
    </div>
  </div>
      </div>
    </div>

    </div>

  <!--cards taken from w3schools-->
  <div class="container-fluid" style="background-color: lightblue;">
    <div class="row">
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP1" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP2" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP3" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP4" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP5" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP6" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP7" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP8" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP9" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP10" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP11" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="..." alt="CSP12" >
            </div>
            <div class="flip-card-back">
              <div class="text-center">
                <a class="btn btn-primary centralise" href="csp.page" role="button">See more!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');

/* dropdown lists */

.dropdown {
  display: inline;
  margin-right: 15px;
  border-radius: 15px;
  overflow: hidden;
}

.dropdown label {
  font-size: 25px;
  padding: 5px;
  color: white;
  font-weight: bold;
}

.dropdown select {
  font-size: 25px;
  padding: 5px;
  border-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  outline: none;
  cursor: pointer;
  text-align: justify;
}
 
.ct{
  display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: lightblue;
}
.card-container {
    display: flex;
    justify-content: space-around;
    width: 80%;
} 

.rd{
  border-radius: 15px;
    width: 30%;
}

.card:first-child {
    transform: rotate(-20deg);
    border:none;
    margin-right: 60px;
}

.card:last-child {
    transform: rotate(20deg);
    border:none;
    margin-left: 60px;
    background-color: lightblue;
}
.card:nth-child(2) {
    margin-top: -140px;
    border:none;
    background-color: lightblue;
}
*{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  color: rgba(6,66,115);
}


/* navbar */
.navbar{
  width:100%;
  margin:auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}


/* logo */
.logo{
  width:250px;
  cursor: pointer;

}

/* the search and login */
.navbar ul li {
  list-style: none;
  display: inline-block;
  margin: 0 20px;
  position: relative;
}

.navbar ul li a {
  text-decoration: none;


}

/* search button */
.search-button {
  background-color: rgba(6,66,115);
  color:white;
  border: none;
  border-radius: 25px;
  padding: 5px 5px;
  font-size: 16pm;
}

.search{
  border-radius: 10px;
  padding: 5px 5px;
  border: 2px solid rgba(6,66,115);;
}

.navbar-toggler{
  background-color: rgba(6,66,115);

}


/* body */

.navbar-list {
  display: flex;
  padding-left: 190px; /* Align items to the left by default */
}

@media (max-width: 991.98px) {
  .navbar-list {
    padding-left: 0px; /* Align items to the right when the page is collapsed */
  }
}
.list-inline-item a {
  text-decoration: none;
  text-transform: uppercase;
  color:  rgba(6,66,115);
  font-weight: bold;
  font-size: larger;
  padding: 5px;
}

.list-inline-item::after{
  content: '';
  height: 3px;
  width: 0;
  background: rgba(6,66,115);
  position: absolute;
  left: 0;
  bottom: 8;
  transition: 0.5s;
}
@media (min-width: 992px) {
  .list-inline-item:hover::after {
    width: 100%;
  }
}

@media (max-width: 991.98px) {
  .list-inline-item:hover::after {
    width: 15%;
    bottom: 0;
  }
}

.flip-card {
  background-color: transparent;
  width: 350px;
  height: 350px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  border-radius: 15px;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 10px;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: rgb(119, 166, 204);
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: rgb(119, 166, 204);
  color: white;
  transform: rotateY(180deg);
}

.centralise{
  margin:150px;
}

</style>

