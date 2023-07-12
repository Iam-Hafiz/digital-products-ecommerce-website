// mobile drop down menu, for both the menu icon and the search bar
const dropDownMenu = document.querySelector('.drop_down_content');

// used to rotate the drop down icon
const dropDownIcon = document.querySelector('.fa-square-caret-down');
function toggleDropDown() {
    dropDownMenu.classList.toggle("drop_down_content_display");
    dropDownIcon.classList.toggle("rotate_drop_down-btn")
}

// user drop down menu desktop and tablette
const userDropDownMenu = document.querySelector('.user_drop_down_content');
function userIconToggle() {
    userDropDownMenu.classList.toggle("user_drop_down_content_display");
}

// user drop down menu mobile
const userDropDownMenuMobile = document.querySelector('.user_drop_down_content_mobile');
function userIconToggle_mobile() {
    userDropDownMenuMobile.classList.toggle("user_drop_down_content_display_mobile");
}



