function openCartDrawer() {
 document.querySelector('[data-drawer-target="drawer-cart"]').click();
 return false;
}
function alreadyMember(membership) {
    alert(`You have already joined as ${membership} Member.`)
}