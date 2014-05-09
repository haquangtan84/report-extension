@Application(defaultController = ReportApplication.class)
@Portlet(name = "ReportPortlet")


@Assets(
        location = AssetLocation.SERVER,
        scripts = {
                @Script(src = "js/jquery-1.8.3.min.js", id = "jquery"),
                @Script(src = "js/snack-min.js", id = "snack"),
                @Script(src = "js/jquery-juzu-utils-0.1.0.js", depends = "jquery", id = "juzu-utils"),
                @Script(src = "js/notif.js", id = "notif", depends = {"jquery", "snack", "juzu-utils"})
        },
        stylesheets = {
                @Stylesheet(src = "css/style.css")
        }
) package org.exoplatform.portlet.report;

