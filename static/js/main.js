$(document).ready(function() {
    var fileName = location.href.split("/").slice(-1)[0];
    fileName = fileName.split(".")[0];
    console.log(fileName);

    $("#" + fileName).addClass("active");

});

function getTemplate(templateName, renderDiv) {
    $.get("../templates/" + templateName + ".handlebars").then(function(result) {
        var template = Handlebars.compile(result);
        templateHTML = template({});
        $(renderDiv).append(templateHTML);
    });
}
