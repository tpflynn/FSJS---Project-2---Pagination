//////////////////////
// script.js program
// FSJS Project 2 - Pagination and Content Filter
// Tom Flynn
// 03/12/2018
///////////////////////

function appendPageLink(actPageParm, searchText, listOfStudents) {

  console.log("Append function run");
  console.log(searchText);
  console.log(listOfStudents);
  console.log(actPageParm);

  // get the count of students
  let studentCount = 0;
  studentCount = listOfStudents.length;
  console.log(studentCount);

  // determine number of pages for student list (round up)
  let pageCount = Math.ceil(studentCount/studentsPerPage);
  console.log(studentsPerPage);
  console.log(pageCount);
  let firstDisplay = 0;
  let lastDisplay = 0
  let lastStudent = 0;
  let aaa = "";

  // first time only, build page buttons info
  if(bldPgBtns == "Yes"){
    bldPgBtns = "No";
    $(".page").append("<div class='pagination'>");
    $(".pagination").append("<ul>");
  }; // end of page button test

  // append the li page links based on number of pages
  $(".pgBtns").remove();
  for (let i=1;i<=pageCount;i++){
    if(i==actPageParm){
      $(".pagination").append(`<li><a class='pgBtns active' href='#'> ${i}  `)
    }; // end active page test
    if(i != actPageParm){
      $(".pagination").append(`<li><a class='pgBtns' href='#'> ${i}  `)
    }; // end not active page test
    console.log(i);
  }; // end page buttons li loop

  // hide the page content if error (search not found)
  if(searchText == "ERROR"){
    $(".pgBtns").remove();
  }; // end error text

  // calculate first and last students on page
  firstDisplay = ((actPageParm*studentsPerPage)-studentsPerPage);
  console.log(firstDisplay);
  lastDisplay = ((actPageParm*studentsPerPage)-1);
  console.log(lastDisplay)
  if(studentCount<studentsPerPage){
    lastDisplay = studentCount-1;
  }; // end student count test
  console.log(lastDisplay);
  // calculate actual last student when displaying last page
  lastStudent = (actPageParm*studentsPerPage);
  console.log(lastStudent);
  if(lastStudent > studentCount){
    lastDisplay = studentCount
    console.log(lastDisplay)
  }; // end the student test

  // call showPage function
  showPage(listOfStudents,firstDisplay,lastDisplay,studentCount);

}; // end of appendPageLink function

////////////////////

function showPage(listOfStudents,firstDisplay,lastDisplay,studentCount) {

  // hide all students listed on page
  console.log(listOfStudents);
  console.log(firstDisplay);
  console.log(lastDisplay);
  console.log(studentCount);
  $(listOfStudents).hide();

  // loop through students list and
  //   show the students that should be displayed
  for (let i=0;i<studentCount;i++){
    if((i >= firstDisplay) && (i<= lastDisplay)){
        $(listOfStudents[i]).show();
        console.log(listOfStudents[i]);
    } // end of first and last display test
  }; // end of student count loop

}; // end of showPage function

////////////////////

// begin searchList function
function searchList(actPageParm, searchText){ //, listOfStudents){

  console.log(searchText);
  let searchMatch = "No";
  let buildSearchList = "No";

  // hide the search not found message
  $(".notFound").hide();

  // get list of  all students
  listOfStudents = $(".student-item");
  // remove okSearch class
  $("li").removeClass("okSearch");
  console.log(listOfStudents);
  // show all students
  $(listOfStudents).hide();

  // if searchText filled-in, search for matches
  if(searchText != null){
    console.log(listOfStudents);
    // get all of the student names
    let searchName = $("h3");
    console.log(searchName);
    // get all student email addresses
    let searchEmail = $(".email");
    console.log(searchEmail);

  // loop through students and test search
    for (let i=0;i<listOfStudents.length;i++){
        console.log([i]);
        searchMatch = "No";
        console.log(searchMatch);

      // search name
      if(searchName[i] != null){
        if((searchName[i].textContent.includes(searchText))==true){
          console.log(searchName[i]);
          console.log("Yes Name Match");
          console.log(searchText);
          searchMatch = "Yes";
          console.log(searchMatch);
        }; // end searchName match test
      }; // end searchName != null test

      // search Email
      if(searchEmail != null){
        if((searchEmail[i].textContent.includes(searchText))==true){
          console.log(searchEmail[i]);
          console.log("Yes Email Match");
          searchMatch = "Yes";
          console.log(searchText);
          console.log(searchMatch);
        }; // end searchEmail match test
      };  // end searchEmail != null test

      // if search match found, add class okSearch to student
      console.log(searchMatch);
      if(searchMatch == "Yes"){
        console.log(listOfStudents[i]);
        console.log([i]);
        $("li").eq([i]).addClass("okSearch");
        buildSearchList = "Yes";
        console.log(listOfStudents[i]);
      }; // end of searchMatch = "Yes" test

    }; // end of loop through students

    // get list of students that match search
    console.log(buildSearchList);
    console.log(listOfStudents);
    if(buildSearchList == "Yes"){
      console.log(buildSearchList);
      listOfStudents = $(".okSearch");
      console.log(listOfStudents);
    }; // end buildSearchList 'yes' test

    // if search match not found, display message
    if(buildSearchList == "No"){
      $(".notFound").show();
      $(".pgBtns").remove();
      searchText = "ERROR";
    }; // end no match test

  };  // end of searchText != null

  // build the page based on search
  if(searchText != "ERROR"){
    appendPageLink(actPageParm, searchText, listOfStudents);
  };  // end search not = error
  if(searchText == "ERROR"){
    actPageParm = 0;
    firstDisplay = 0;
    lastDisplay = 0;
    studentCount = 0;
    showPage(listOfStudents,firstDisplay,lastDisplay,studentCount);
  }; //end error test

}; // end of searchList function

////////////////////

// end of all functions

////////////////////

// set the number of students per page
const studentsPerPage = 10;

// create the search section in the header on initial page load (1x)
$(".page-header.cf").append("<div class='student-search'>");
$(".student-search").append("<input placeholder='Search for students...'>");
$(".student-search").append("<button>Search</button>");
$(".student-search").append("<div class='notFound'>No students found... ");
$(".notFound").hide();

// get the list of all students on initial page load (1x)
listOfStudents = $(".student-item");
console.log(listOfStudents);

// call the appendPageLink function on initial page load (1x only)
let actPageParm = 1;
let searchText = null;
let bldPgBtns = "Yes";
appendPageLink(actPageParm, searchText, listOfStudents);
console.log("1x completed");

// monitor for page button click
$(".pagination").click(function(event){
  console.log("page clicked");
  let pageButtonClicked = 0;
  // get page number button text and convert to numeric
  pageButtonClicked = parseInt(event.target.text);
  console.log(pageButtonClicked);
  actPageParm = pageButtonClicked;
  console.log(actPageParm);
  // call function to build selected page
  searchText = null;
  appendPageLink(actPageParm, searchText, listOfStudents);
  let pButClck = $(".pagination");
  console.log(pButClck);
}); // end of test for page button click

// monitor for search button clicked
$(".student-search button").on("click", function(event){
  console.log("search clicked");
  searchText = $("input").val().toLowerCase();
  console.log(searchText);
  actPageParm = 1;
  // build list of students based on search
  searchList(actPageParm, searchText); //, listOfStudents);
}); // end of monitor for search button clicked


// end of JavaScript program
