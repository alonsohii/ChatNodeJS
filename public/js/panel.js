
var Dashboard = function () {
	var global = {
		tooltipOptions: {
			placement: "right"
		},
		menuClass: ".c-menu"
	};

	var menuChangeActive = function menuChangeActive(el) {
		var hasSubmenu = $(el).hasClass("has-submenu");
		$(global.menuClass + " .is-active").removeClass("is-active");
		$(el).addClass("is-active");

		// if (hasSubmenu) {
		// 	$(el).find("ul").slideDown();
		// }
	};

	var sidebarChangeWidth = function sidebarChangeWidth() {
        debugger;
		var $menuItemsTitle = $("li .menu-item__title");

		$("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
		/*$(".hamburger-toggle").toggleClass("is-opened");

		if ($("body").hasClass("sidebar-is-expanded")) {
			$('[data-toggle="tooltip"]').tooltip("destroy");
		} else {
			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
        } */
        return false;
	};

	return {
        menuChangeActive,
        sidebarChangeWidth,
        global
		/*init: function init() {
          
		}*/
	};
}();

//Dashboard.init();

debugger;
$(".js-hamburger").on("click", Dashboard.sidebarChangeWidth);

$(".js-menu li").on("click", function (e) {
    Dashboard.menuChangeActive(e.currentTarget);
});

//$('[data-toggle="tooltip"]').tooltip(Dashboard.global.tooltipOptions);