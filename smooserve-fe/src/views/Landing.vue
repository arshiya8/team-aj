<script >
import NavBar from "../components/NavBar.vue"
import CaroPics from "../components/CaroPics.vue";
export default {
  components: {
    NavBar,
    CaroPics,
  },
};
</script>

<template>
  <!-- navbar component -->
  <NavBar />
  <CaroPics />

  <div class="container-fluid" style="background-color: lightblue;">
    <div class="row">
      <h2 style="color:black; font-weight: bold; text-align: center;">COMMUNITY SERVICE PROJECTS</h2><br>
      <h2 style="color:red; font-weight: bold; text-align: center;">THIS MONTH</h2>
    </div>
  </div>


<div class="row">
    <!-- row cards -->
    <div class="col-md-3">
        <div class="card">
            <img class="card-img-top" src="layout/images/card1.jpg" alt="card1" style="transform:rotate(-20deg)">
        </div>
    </div>
    <div class="col-md-3">
        <div class="card">
            <img class="card-img-top" src="layout/images/card2.jpg" alt="card2">
        </div>
    </div>
    <div class="col-md-3">
        <div class="card">
            <img class="card-img-top" src="layout/images/card3.jpg" alt="card3">
        </div>
    </div>
    </div>



  <!-- body -->
  <div class="container text-center">
    <h1 style="font-weight: bold; margin: 20px 0;">LIBRARY</h1>
    <div>

    </div>
  </div>

  <!--cards taken from w3schools-->
  <div class="container">
    <div class="row">
      <div class="col">
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
      <div class="col">
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
      <div class="col">
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
    </div>
  </div>

</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');


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

